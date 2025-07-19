import express  from "express";
export {
    getCategories,
    getCategoryById,    
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('categories/', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('categories/:id', deleteCategory);

export default router;