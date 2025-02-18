import Product from "../database/models/product.js";
import Category from "../database/models/category.js";

export const add = async (req, res) => {
    try {
        const product = await Product.create({...req.body});

        return res.status(200).json({message: "product added successfully", response: product});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
}

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        const result = products.map(async (item) => {
            console.log(item);
            const category = await Category.findById(item.category);
            return { ...item, category: category.name };
        });
        
        return res.status(200).json({message: "Products data retrieved successfully", response: products});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
}