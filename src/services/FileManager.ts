import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { existsSync } from "node:fs"
import os from "os";
import path from "path"
import { NotFoundError } from "../exceptions/NotFoundError";

const tempDir = os.tmpdir();

const uploadFile = async (file: UploadedFile, newFileName?: string): Promise<void> => {
    const fileName = newFileName ?? file.name;
    const fullPath = path.join(tempDir, fileName);

    if (existsSync(fullPath)) {
        console.warn(`The file ${fileName} already exists and will be overwritten.`);
    }

    return new Promise<void>((resolve, reject) => {
        file.mv(fullPath, ((error) => {
            if (!!error) {
                const errorMessage = "An internal error occurred while copying the file.";
                reject(new Error(errorMessage));
            } else {
                resolve();
            }
        }));
    });
}

const getFileFullPathToDownload = async (fileName: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const fullPath = path.join(tempDir, fileName);
        if (!existsSync(fullPath)) {
            reject(new NotFoundError(`File ${fileName} not found.`))
        }
        resolve(path.join(tempDir, fileName))
    });
}

export const FileManagerService = {
    getFileFullPathToDownload,
    uploadFile
}