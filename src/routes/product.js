import {Router } from 'express';
import * as productController from '../controller/product.js';

const router = Router();

router.post("/add", productController.add);
router.get("/getAll", productController.getAll);

export default router;