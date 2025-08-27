import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    imageURL: {
        type: String,
        required: true,
        default: "https://placeholder.com/150x150.png",
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;