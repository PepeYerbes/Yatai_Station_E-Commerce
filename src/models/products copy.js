import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({})
const products = mongoose.model("products", productsSchema);
module.exports = products;