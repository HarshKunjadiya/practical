import { Router } from "express";
import { firstcount, validatePassword } from "../controller/test.js";
import { validateBody } from "../middleware/test.js";

const testRouter = Router();

testRouter.get("/harsh", validateBody, firstcount);
testRouter.post("/testPassword", validatePassword)

export default testRouter; 