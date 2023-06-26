import { Request, Response } from "express";
import { PingResponse } from "../types/HealthTypes";

let isShuttingdown: false;

process.on('SIGTERM', () => { isShuttingdown = true });

export default {
    getPingResponse: async(req: Request, res: Response<PingResponse>) => {
        const responseMessage: PingResponse = { message: "pong" }
        res.send(responseMessage);
    },

    isServiceReady: async(req: Request, res: Response) => {
        if (isShuttingdown) {
            res.status(500);
            return res.send('Server shutting down.');
        }

        res.status(200);
        return res.send('Ok.');
    }
}