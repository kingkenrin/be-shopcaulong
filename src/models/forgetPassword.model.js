const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Forgetpassword'
const COLLECTION_NAME = 'Forgetpasswords'

var ForgetpasswordSchema = new Schema({
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

module.exports = model(DOCUMENT_NAME, ForgetpasswordSchema);