import Product from "../models/Product.js";

async function getProducts(req, res) {
    try { 
        const products = await Product.find().sort({name:1}).populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function getProductById(req, res) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).send({ error });
    }
    async function getProductsByCategory(req, res) {
        try {
            const id = req.params.idCategory;
            const products = await Product.find({ category: id }).populate('category').sort({ name: 1 });
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found in this category" });
            }
            res.json(products);
        } catch (error) {
            res.status(500).send({ error });
        }
    }
}
async function createProduct(req, res) {
    try { 
        const { name, description, price, stock, category, imageURL } = req.body;
        if (!name || !description || !price || !stock || !category || !imageURL) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category,
            imageURL
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function updateProduct(req, res) {
    try {
        const idProduct = req.params.id;
        const { name, description, price, stock, category, imageURL } = req.body;
        if (!name || !description || !price || !stock || !category || !imageURL) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(id,
            {
                name,
                description,
                price,
                stock,
                category,
                imageURL
            },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function deleteProduct(req, res) {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error });
    }
}

export {
    getProducts,
    getProductById,  
    getProductsByCategory,  
    createProduct,
    updateProduct,
    deleteProduct
}
