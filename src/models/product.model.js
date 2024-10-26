const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    description: {
        type: String,
        required: true,
    },
    image: [
        {
            type: String,
            required: true,
        }
    ],
    categories: [
        {
            type: String,
        }
    ],
    manufactuer: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Manufactuer',
            required: true,
        }
    ]

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, ProductSchema);