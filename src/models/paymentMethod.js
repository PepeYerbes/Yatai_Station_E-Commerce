import mongoose from "mongoose";
const paymentMethodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    methodType: {
        type: String,
        enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer"],
        required: true,
    },
    cardNumber: {
        type: String,
        required: function() { return this.methodType === "Credit Card" || this.methodType === "Debit Card"; },
        trim: true,
    },
    cardHolderName: {
        type: String,
        required: function() { return this.methodType === "Credit Card" || this.methodType === "Debit Card"; },
        trim: true,
    },
    expiryDate: {
        type: Date,
        required: function() { return this.methodType === "Credit Card" || this.methodType === "Debit Card"; },
    },
    cvv: {
        type: String,
        required: function() { return this.methodType === "Credit Card" || this.methodType === "Debit Card"; },
        trim: true,
    },
    paypalEmail: {
        type: String,
        required: function() { return this.methodType === "PayPal"; },
        trim: true,
    },
   
})
const paymentMethod = mongoose.model("paymentMethod", paymentMethodSchema);
module.exports = paymentMethod;