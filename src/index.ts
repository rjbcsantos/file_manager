import express, { Application } from "express";
import morgan from "morgan";

import healthRouter from "./routers/HealthRoutes";
import fileManagerRouter from "./routers/FileManagerRoutes";

const PORT = process.env.PORT || 8000;

const app: Application = express();

// Adding some middlewares.
app.use(morgan("tiny"));

// Installing routes.
app.use(healthRouter);
app.use('/api', fileManagerRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});