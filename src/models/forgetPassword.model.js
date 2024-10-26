const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'QuenMatKhau'
const COLLECTION_NAME = 'QuenMatKhaus'

var quenMatKhauSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, quenMatKhauSchema);