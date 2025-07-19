import Category from "../models/category.js";

async function getCategories(req, res) {
    try { 
        const categories = await Category.find().populate('parentCategory').sort({name:1});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function getCategoryById(req, res) {
    try { 
        const category = await Category.findById(req.params.id).populate('parentCategory');
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function createCategory(req, res) {
    try { 
        const { name, description, imageURL, parentCategory } = req.body;
        const newCategory = new Category({ 
            name,
            description,
            imageURL:imageURL || null,
            parentCategory: parentCategory || null
});
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function updateCategory(req, res) {
    try { 
        const { name, description, imageURL, parentCategory } = req.body;
        const idCategory = req.params.id;
        const updatedCategory = await Category.findByIdAndUpdate(
            idCategory,
            {
                name,
                description,
                imageURL,
                parentCategory
            },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function deleteCategory(req, res) {
    try { 
        const idCategory = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(idCategory);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error });
    }
}

export {
    getCategories,
    getCategoryById,    
    createCategory,
    updateCategory,
    deleteCategory
}
