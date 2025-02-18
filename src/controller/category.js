import Category from "../database/models/category.js";

export const add = async (req, res) => {
    try {
        const category = await Category.create({...req.body});

        return res.status(200).json({message: "Category added successfully", response: category});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
}

export const getAll = async (req, res) => {
    try {
        const category = await Category.find();

        return res.status(200).json({message: "Category data retrieved successfully", response: category});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
}