import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    imageURL: {
        type: String,
        required: true,
        default: "https://placeholder.com/150x150.png",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        trim: true,
    },


})
const products = mongoose.model("products", productsSchema);
module.exports = products;