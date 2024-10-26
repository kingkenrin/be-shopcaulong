const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    avatar: {
        type: String,
        default: 'https://nupet.vn/wp-content/uploads/2023/10/anh-avatar-cute-meo-nupet-2.jpg'
    },
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    birthday: {
        type: Date,
    },
    role: {
        type: String,
        enum: ["Customer", "Staff"],
        required: true,
    },
    discount: {
        type: Number,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, UserSchema);