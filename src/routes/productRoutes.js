import express  from "express";
export {
    getProduct,
    getProductById, 
    getProductsByCategory,   
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productControllers.js";

const router = express.Router();

router.get('/Product', getProduct);
router.get('/Product/:id', getProductById);
router.get('/Product/category/:category', getProductsByCategory);
router.post('Product/', createProduct);
router.put('/Product/:id', updateProduct);
router.delete('Product/:id', deleteProduct);

export default router;