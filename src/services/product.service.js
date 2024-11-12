const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class ProductService {
    static getAllProduct = async () => {
        try {
            const products = await productModel.find({}).populate('manufactuers').populate('categories')

            return products.map(product =>
                getData({ fields: ['_id', "name", "type", "discount", "length", "weight", "description", "categories", "manufactuers",], object: product })
            )

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getProductById = async ({ id }) => {
        try {
            const product = await productModel.findById(id).populate('manufactuers').populate('categories')

            if (!product) {
                return {
                    success: false,
                    message: "wrong product"
                }
            }

            return getData({ fields: ['_id', "name", "type", "discount", "length", "weight", "description", "categories", "manufactuers",], object: product })

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addProduct = async (files, { name, weight, length, type, discount, description, categories, manufactuers }) => {
        try {
            if (type) {

                type = JSON.parse(type)

                type.forEach(t => {
                    t.images = {
                        main: "",
                        other: []
                    }
                })
            }

            const product = await productModel.findOne({ name: name })

            if (product) {
                return {
                    success: false,
                    message: "product exists"
                }
            }

            files.forEach((file) => {
                type.forEach(t => {
                    if (file.originalname.includes(t.color)) {
                        if (file.originalname.includes("main"))
                            t.images.main = file.path;
                        else {
                            t.images.other.push(file.path);
                        }
                    }
                })
            })

            const newProduct = new productModel({
                "name": name,
                "weight": weight,
                "length": length,
                "type": type,
                "discount": discount,
                "description": description,
                "categories": categories,
                "manufactuers": manufactuers
            })

            const savedProduct = await newProduct.save()

            return getData({ fields: ['_id', "name", "type", "discount", "length", "weight", "description", "categories", "manufactuers",], object: savedProduct })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateProduct = async (files, { id, name, price, color, discount, quantity, description, categories, manufactuers }) => {
        try {
            const product = await productModel.findById(id)

            if (!product) {
                return {
                    success: false,
                    message: "wrong product"
                }
            }

            if (color) {
                product.type.forEach(t => {
                    if (t.color == color) {
                        if (price)
                            t.price = price

                        if (quantity)
                            t.quantity = quantity

                        if (files.length != 0) {
                            let productImages = {
                                main: "",
                                other: []
                            }

                            files.forEach((file) => {
                                if (file.originalname.includes("main"))
                                    productImages.main = file.path
                                else {
                                    productImages.other.push(file.path)
                                }
                            })

                            t.images = productImages
                        }
                    }
                })
            }

            if (name)
                product.name = name

            if (discount) {
                product.discount = discount

                const carts = await cartModel.find({ 'items.productId': id })

                if (carts) {
                    carts.forEach(cart => {
                        cart.items.forEach(async item => {
                            if (item.productId == id) {
                                await cart.save()

                                console.log("first")
                            }
                        })
                    })
                }
            }

            if (description)
                product.description = description

            if (categories)
                product.categories = categories

            if (manufactuers)
                product.manufactuers = manufactuers



            const savedProduct = await product.save()

            return getData({ fields: ['_id', "name", "type", "discount", "length", "weight", "description", "categories", "manufactuers",], object: savedProduct })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteProduct = async ({ id }) => {
        try {
            const product = await productModel.findByIdAndDelete(id)

            if (!product) {
                return {
                    success: false,
                    message: "wrong product"
                }
            }

            return {
                success: true,
                message: "delete successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = ProductService;