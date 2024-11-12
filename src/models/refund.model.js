const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Refund'
const COLLECTION_NAME = 'Refunds'

var RefundSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ["Pending", "Done"],
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, RefundSchema);