import { Router } from "express";
import * as employeeController from "../controller/exployee.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/add", employeeController.addEmployee);

router.get("/getAll", employeeController.getAllEmployee);

router.get("/get/:id", employeeController.getEmployeeById);

router.post("/login", employeeController.login);

router.patch("/update",authenticate, employeeController.updateEmployee);

router.delete("/delete", employeeController.deleteEmployee);

export default router;