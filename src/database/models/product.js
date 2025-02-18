import { Schema, model } from "mongoose";

const schema = Schema({
    name: {
        type: String,
        default: "default"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    price: {
        type: Number,
        default: 100
    },
    stock: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Product = model("product", schema);
export default Product;