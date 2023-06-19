import express from "express";
import HealthController from "../controllers/HealthController";

const healthRouter = express.Router();

healthRouter.get("/ping", async (_req, res) => {
    const controller = new HealthController();
    const response = await controller.getPingResponse();
    return res.send(response);
});

export default healthRouter