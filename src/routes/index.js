import express from "express";

import authRoutes from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import cartRoutes from "./cartRoutes.js";
import productRoutes from "./productRoutes.js";

const router = express.Router();

router.use(categoryRoutes);
router.use(productRoutes);
router.use(authRoutes);
router.use(cartRoutes);

export default router;

