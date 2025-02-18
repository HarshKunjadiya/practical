import { Router } from 'express';
import * as categoryController from '../controller/category.js';

const router = Router();

router.post("/add", categoryController.add);
router.get("/getAll", categoryController.getAll);

export default router;