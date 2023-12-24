import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const port = process.env.PORT || 8000;
await connectDB(); //connect to mongoDB
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/config/paypal", (req, res) =>
  res.send({ clientID: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("api is working");
  });
}

app.use(notFound);
app.use(errorHandler);
// callback is needed in listen function
app.listen(port, () => console.log(`server is running on port ${port}`));
