import express from "express";

import { FileManagerController } from "../controllers/FileManager";
import {
    downloadRequestValidationRules,
    uploadRequestValidationRules
} from "../middleware/FileManagerValidations";

const router = express.Router();

router.post(
    "/upload",
    uploadRequestValidationRules,
    FileManagerController.uploadFile
);

router.get(
    "/download",
    downloadRequestValidationRules,
    FileManagerController.downloadFile
);

export default router