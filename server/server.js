import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import productRoute from "./Routes/ProductRoutes.js";
import invitationRoute from "./Routes/InvitationRoutes.js";
import vendorRoute from "./Routes/VendorRoutes.js";
import giftRoute from "./Routes/GiftRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// API
app.use("/api/products", productRoute);
app.use("/api/invitations", invitationRoute); 
app.use("/api/vendors", vendorRoute);
app.use("/api/gifts", giftRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
