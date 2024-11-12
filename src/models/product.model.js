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
    length: { // theo mm
        type: Number,
        required: true,
    },
    weight: { // theo g
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    description: {
        type: String,
        required: true,
    },
    type: [
        {
            color: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            images: {
                main: {
                    type: String,
                    required: true,
                },
                other: [
                    {
                        type: String,
                        required: true,
                    }
                ]

            },
            quantity: {
                type: Number,
            },
        }
    ],
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Categorie',
            required: true,
        }
    ],
    manufactuers: [
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