import express from "express";
import 'dotenv/config';
import employeeRoutes from "./routes/employee.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cors from 'cors';
import { Server } from 'socket.io';
import { rateLimit } from 'express-rate-limit';
import { createServer } from 'http';
// import { job } from './cronJobs/daily.js';

const app = express();
app.use(express.json());

const httpServer = createServer(app)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false,
  message: "Too many request, Please try again after some time!"
})

app.use(limiter)

// job.start();
app.use(cors({
  origin: ["*"],
  methods: ["get", "post"]
}))

app.use("/employee", employeeRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

app.use("*", (req, res) => {
  return res.status(500).send({message: "API bed gateway"});
});

const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`sever is running on port ${PORT}`);
// });

// const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("message", (doc) => {
    console.log("message ==", doc)
    socket.broadcast.emit("message", doc)
  })

  socket.on("response", (doc) => {
    console.log("response ==", doc);
    
    socket.emit("response", doc)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected...", socket.id);
  })
})

httpServer.listen(PORT, () => {
  console.log("http server is running on port", PORT);
})