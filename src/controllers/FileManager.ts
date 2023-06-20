import { Request, Response } from "express";
import { FileManagerService } from "../services/FileManager";
import { UploadedFile } from "express-fileupload";
import { matchedData, validationResult } from "express-validator";
import { NotFoundError } from "../exceptions/NotFoundError";


function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

const uploadFile = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
            
    const { fileName } = matchedData(req);
    FileManagerService.uploadFile(req.files?.uploadedFile as UploadedFile, fileName)
        .then(() => res.send('File uploaded!'))
        .catch((ex) => {
            console.error('Error uploading file:', ex);
            res.status(500).send(getErrorMessage(ex))
        });
};

const downloadFile = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const { fileName } = matchedData(req);

    FileManagerService.getFileFullPathToDownload(fileName as string)
        .then((fullPath: string) => {
            res.download(fullPath, ((error) => {
                if (error) {
                    console.error('Error downloading file:', error);
                    res.status(500).send('Error downloading file');
                }
            }));
        })
        .catch((ex) => {
            console.error('Error trying to get the file full path to download:', ex);
            if (ex instanceof NotFoundError) {
                res.status(404).send(getErrorMessage(ex));
            } else {
                res.status(500).send(getErrorMessage(ex));
            }
        });
}

export const FileManagerController = {
    downloadFile,
    uploadFile
}