import express  from "express";
export {
    getcart,
    getcartById, 
    getcartsByCategory,   
    createcart,
    updatecart,
    deletecart
} from "../controllers/cartControllers.js";

const router = express.Router();

router.get('/cart', getcart);
router.get('/cart/:id', getcartById);
router.get('/cart/category/:category', getcartsByCategory);
router.post('cart/', createcart);
router.put('/cart/:id', updatecart);
router.delete('cart/:id', deletecart);

export default router;