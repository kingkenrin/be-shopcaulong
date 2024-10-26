const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

var OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: Types.ObjectId,
                ref: 'Product',
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            }
        }
    ],
    address: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    state: {
        type: String,
        enum: ["Packing", "Shipping", "Confirming", "Cancel"],
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

OrderSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    next();
});

module.exports = model(DOCUMENT_NAME, OrderSchema);