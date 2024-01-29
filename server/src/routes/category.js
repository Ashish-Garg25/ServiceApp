import express from "express";
import { createCategory, deleteCategory, getCategory, getCategoryById, getCategoryByName, updateCategory } from "../controllers/category.js";

const router = express.Router();

router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.get('/search/:name', getCategoryByName)
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;