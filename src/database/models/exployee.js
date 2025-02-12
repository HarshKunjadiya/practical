import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const schema = Schema({
    name: {
        type: String,
        default: "default"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["fronend-dev", "devops", "tester"],
        default: "tester"
    },
    birthDate: {
        type: Date
    }
}, {
    timestamps: true
});

schema.pre('save', async function (next) {
    const hashedPassowrd = bcrypt.hash(this.password, 10);
    this.password = hashedPassowrd;
    next();
});

const Employee = model("employee", schema)
export default Employee;