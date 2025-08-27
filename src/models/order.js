import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price : {
            type: Number,
            required: true,
            min: 1,
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Cancelled"],
        default: "Pending",
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    EventDate: {
        type: Date,
        default: null,
    },
    paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        enum: ["Credit Card", "PayPal", "Bank Transfer", "Cash"],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
    },
    Notes: {
        type: String,
        trim: true,
        default: "",
    },
    Taxes: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    hourEvent: {
        type: String,
        required: true,
        trim: true,
    },
    shippingAddress: {
        type: String,
        required: true,
        trim: true,
    },
    contactPhone: {
        type: String,
        required: true,
        trim: true,

},
});

const order = mongoose.model("order", orderSchema);

export default order;