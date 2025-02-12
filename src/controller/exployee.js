import Employee from "../database/models/exployee.js";
import bcrypt from "bcrypt";
import { signJWT } from "../utility/jwt.js";

export const addEmployee = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const employee = await Employee.create({
    //     name, password: hashedPassword, email, role
    // })

    const employee = new Employee({
      ...req.body /* , password: hashedPassword */,
    });
    await employee.save();

    return res
      .status(200)
      .json({ message: "Employee Created Successfully", response: employee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getAllEmployee = async (req, res) => {
  try {
  
    console.log("user data ===", req.user);
    
    const response = await Employee.find();
    return res
      .status(200)
      .json({ message: "Employee data retrieved succesfully...", response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Employee.findById(id);

    if (!response) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json({ message: "success", response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }

    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    const isVerified = await bcrypt.compare(password, employee.password);
    if (!isVerified) {
      return res.status(409).json({ message: "Invalid Email or Passowrd!" });
    }

    const accessToken = signJWT({
      id: employee._id,
      name: employee.name,
      role: employee.role,
    });

    return res
      .status(200)
      .json({ message: "Login Successfully.", token: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { email, name } = req.body;

    const employee = await Employee.findOneAndUpdate({ email }, { name: name });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    // employee.name = name;
    // await employee.save();

    return res
      .status(200)
      .json({ message: "Data updated successsfully!", response: employee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { email } = req.body;

    await Employee.deleteOne({ email });
    return res.status(200).json({ message: "Employee removed successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
