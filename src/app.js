import express from "express";
import 'dotenv/config';
import routes from "./routes/test.js";
import employeeRoutes from "./routes/employee.js";

const app = express();
app.use(express.json());

app.use("/employee", employeeRoutes);
app.use(routes);

app.use("*", (req, res) => {
  return res.status(500).send({message: "API bed gateway"});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`sever is running on port ${PORT}`);
});
