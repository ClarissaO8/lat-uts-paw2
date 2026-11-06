import cors from "cors";
import express from "express";

import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import apiRoutes from "./routes/api.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;