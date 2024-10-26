const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

var ShopSchema = new Schema({
    banner: [
        {
            type: String,
        }
    ],
    logo: {
        type: String,
    },
    about: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    hotline: {
        type: String,
    },
    phone: {
        type: String,
    },

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, ShopSchema);