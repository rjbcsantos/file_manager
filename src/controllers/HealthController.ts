import { PingResponse } from "../types/HealthTypes";

export default class PingController {
    public async getPingResponse(): Promise<PingResponse> {
        return {
            message: "pong",
        };
      } 
}