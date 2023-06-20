import { Request, Response } from "express";
import { PingResponse } from "../types/HealthTypes";

export default {
    getPingResponse: async(req: Request, res: Response<PingResponse>) => {
        const responseMessage: PingResponse = { message: "pong" }
        res.send(responseMessage);
    } 
}