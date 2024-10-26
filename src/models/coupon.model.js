const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Coupon'
const COLLECTION_NAME = 'Coupons'

var CouponSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    discount:{
        type: String,
        required: true,
    },
    startDay:{
        type: Date,
        required: true,
    },
    endDay:{
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, CouponSchema);