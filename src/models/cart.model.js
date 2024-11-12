const productModel = require('../models/product.model')
const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'Carts'

var CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: Types.ObjectId,
                ref: 'Product',
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },
            color: {
                type: String,
                require: true
            },
            price: {
                type: Number,
                require: true
            }
        }
    ],
    totalPrice: {
        type: Number,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

CartSchema.pre('save', async function (next) {
    const products = await productModel.find({})

    this.items.forEach(item => {
        products.forEach(product => {
            if(product.id == item.productId){
                product.type.forEach(p => {
                    if(p.color == item.color){
                        item.price = p.price-product.discount
                    }
                })
            }
        })
    })

    this.totalPrice = this.items.reduce((total, item) => {

        return total + item.price * item.quantity;
    }, 0);

    next();
});

module.exports = model(DOCUMENT_NAME, CartSchema);