const productModel = require('../models/product.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class UserService {
    static getAllProduct = async () => {
        try {
            const products = await productModel.find({}).populate('manufactuers').populate('categories')

            return products.map(product =>
                getData({ fields: ['_id', "name", "price", "discount", "quantity", "description", "images", "categories", "manufactuers",], object: product })
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

            return getData({ fields: ['_id', "name", "price", "discount", "quantity", "description", "images", "categories", "manufactuers",], object: product })

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addProduct = async (files, { name, price, discount, quantity, description, categories, manufactuers }) => {
        try {
            const product = await productModel.findOne({ name: name })

            if (product) {
                return {
                    success: false,
                    message: "product exists"
                }
            }

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

            const newProduct = new productModel({
                "images": productImages,
                "name": name,
                "price": price,
                "discount": discount,
                "quantity": quantity,
                "description": description,
                "categories": categories,
                "manufactuers": manufactuers
            })

            const savedProduct = await newProduct.save()

            return getData({ fields: ['_id', "name", "price", "discount", "quantity", "description", "images", "categories", "manufactuers",], object: savedProduct })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateProduct = async (files, { id, name, price, discount, quantity, description, categories, manufactuers }) => {
        try {
            const product = await productModel.findById(id)

            if (!product) {
                return {
                    success: false,
                    message: "wrong product"
                }
            }

            if (name)
                product.name = name

            if (price)
                product.price = price

            if (discount)
                product.discount = discount

            if (quantity)
                product.quantity = quantity

            if (description)
                product.description = description

            if (categories)
                product.categories = categories

            if (manufactuers)
                product.manufactuers = manufactuers

            if(files){
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

                product.images = productImages
            }

            const savedProduct = await product.save()

            return getData({ fields: ['_id', "name", "price", "discount", "quantity", "description", "images", "categories", "manufactuers"], object: savedProduct })
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

module.exports = UserService;