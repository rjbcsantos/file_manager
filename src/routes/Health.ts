import express, { Response } from "express";
import HealthController from "../controllers/Health";

const healthRouter = express.Router();

healthRouter.get("/ping", HealthController.getPingResponse);

healthRouter.get('/readiness', HealthController.isServiceReady)

export default healthRouter