const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Manufactuer'
const COLLECTION_NAME = 'Manufactuers'

var ManufactuerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    information: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, ManufactuerSchema);