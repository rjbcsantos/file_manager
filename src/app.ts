import express, { Application } from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";

import healthRouter from "./routes/Health";
import fileManagerRouter from "./routes/FileManager";

const app: Application = express();

// Adding some middlewares.
app.use(morgan("tiny"));  // Logging HTTP requests.
app.use(fileUpload(
    {
        safeFileNames : true,
        preserveExtension: true
    }
))

// Installing routes.
app.use(healthRouter);
app.use("/api/file-manager", fileManagerRouter);

export default app