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
            }
        }
    ],
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, CartSchema);