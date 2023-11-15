import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 8000;
await connectDB(); //connect to mongoDB
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("api is working");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
// callback is needed in listen function
app.listen(port, () => console.log(`server is running on port ${port}`));
