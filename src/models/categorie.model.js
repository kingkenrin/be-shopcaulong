const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Categorie'
const COLLECTION_NAME = 'Categories'

var CategorieSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, CategorieSchema);