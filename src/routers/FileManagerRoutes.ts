import express from "express";

const fileManagerRouter = express.Router();

fileManagerRouter.post("/file-manager/upload", async (_req, res) => {
    return res.send("TODO");
});

fileManagerRouter.get("/file-manager/download", async (_req, res) => {
    return res.send("TODO");
});

export default fileManagerRouter