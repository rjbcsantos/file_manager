import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { body, query } from 'express-validator'

import path from 'path'

const expectedExtensions = [".gz"];
const expectedFileType = ["gzip"];

const validateUploadedFile = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files?.uploadedFile) {
        return res.status(400).send('UploadedFile field cannot be empty.');
    }

    const file = req.files.uploadedFile as UploadedFile;

    const fileExtension = file.mimetype.split('/').pop() as string;
    if (!expectedFileType.includes(fileExtension)) {
        return res.status(400).send('File extension is not allowed.');
    }

    next();
}

const validateFileNameToDownloadAndUpload = (value: string) => {
    const fileExtension = path.parse(value).ext;
    if (!expectedExtensions.includes(fileExtension)) {
        throw new Error(`File extension is not allowed on ${value}`);
    }
    return true;
}

export const uploadRequestValidationRules = [
    body('fileName').escape().optional().custom(validateFileNameToDownloadAndUpload),
    validateUploadedFile
];

export const downloadRequestValidationRules = [
    query('fileName').escape().notEmpty().custom(validateFileNameToDownloadAndUpload)
]
        