import { Schema, model } from "mongoose";

const schema = Schema(
  {
    name: {
      type: String,
      default: "default",
    },
    // products: [{type: }]
  },
  {
    timestamps: true,
  }
);

const Category = model("category", schema);
export default Category;
