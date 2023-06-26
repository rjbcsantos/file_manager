import { Request, RequestHandler, Response } from 'express';
import { validationResult } from "express-validator";
import httpMocks from "node-mocks-http";
import { downloadRequestValidationRules, uploadRequestValidationRules } from './FileManagerValidations';

const testExpressValidatorMiddleware = async (req: Request, res: Response, middlewares: RequestHandler[]) => {
    await Promise.all(middlewares.map(async (middleware) => {
        await middleware(req, res, () => undefined);
    }));
};

const respMock = httpMocks.createResponse();

describe('FileManagerValidations::downloadRequestValidationRules', () => {
    test('should failed when fileName is empty', async () => {
        const reqMock = httpMocks.createRequest({
            method: 'GET',
            url: '/user/42',
        });
        const expectedErrors = [
            {type: 'field', value: '', msg: 'Invalid value', path: 'fileName', location: 'query'},
            {type: 'field', value: '', msg: 'File extension is not allowed on ', path: 'fileName', location: 'query'}
        ]
        await testExpressValidatorMiddleware(reqMock, respMock, downloadRequestValidationRules);
        const result = validationResult(reqMock);

        const errorResult = result.array();
        expect(errorResult).toHaveLength(2);
        expect(errorResult).toEqual(expect.arrayContaining(expectedErrors));
    });

    const invalidExtensions = ['.7z', '.jpg', '.jpeg', '.png', '.pdf', '.zip'];
    test.each(invalidExtensions)('should failed when fileName has an invalid extension', async (ext: string) => {
        const fileName = 'arquivo' + ext;
        const reqMock = httpMocks.createRequest({
            method: 'GET',
            url: '/user/42',
            query: {
                fileName: fileName
            }
        });
        const expectedErrors = [
            { 
                type: 'field',
                value: fileName,
                msg: 'File extension is not allowed on ' + fileName,
                path: 'fileName',
                location: 'query'
            }
        ]
        await testExpressValidatorMiddleware(reqMock, respMock, downloadRequestValidationRules);
        const result = validationResult(reqMock);

        const errorResult = result.array();
        expect(errorResult).toHaveLength(1);
        expect(errorResult).toEqual(expect.arrayContaining(expectedErrors));
    });

    test('should succeed when fileName is correctly filled', async () => {
        const reqMock = httpMocks.createRequest({
            method: 'GET',
            url: '/user/42',
            query: {
                fileName: 'file.gz'
            }
        });
        await testExpressValidatorMiddleware(reqMock, respMock, downloadRequestValidationRules);
        const result = validationResult(reqMock);
        expect(result.isEmpty()).toBe(true);
    });

    test('should saniteze the fileName field', async () => {
        const reqMock = httpMocks.createRequest({
            method: 'GET',
            url: '/user/42',
            query: {
                fileName: '<b>file.gz</b>'
            }
        });
        const expectedError = {
            type: 'field',
            value: '&lt;b&gt;file.gz&lt;&#x2F;b&gt;',
            msg: 'File extension is not allowed on &lt;b&gt;file.gz&lt;&#x2F;b&gt;',
            path: 'fileName',
            location: 'query'
        }
        await testExpressValidatorMiddleware(reqMock, respMock, downloadRequestValidationRules);
        const result = validationResult(reqMock);

        const errorResult = result.array();
        expect(errorResult).toHaveLength(1);
        expect(errorResult).toEqual(expect.arrayContaining([expectedError]));
    });
});

describe('FileManagerValidations::uploadRequestValidationRules', () => {
    test('should failed when no files are uploaded.', async () => {
        const reqMock = httpMocks.createRequest({
            method: 'GET',
            url: '/user/42',
            body: {
                fileName: 'file.gz'
            }
        });
        await testExpressValidatorMiddleware(reqMock, respMock, uploadRequestValidationRules);
        validationResult(reqMock);

        expect(respMock._getStatusCode()).toBe(400);
        expect(respMock._getData()).toBe('UploadedFile field cannot be empty.');
    });

    test('should saniteze the fileName filed', async () => {
        const reqMock = httpMocks.createRequest({
            method: 'GET',
            url: '/user/42',
            body: {
                fileName: '<b></b>'
            }
        });
        const expectedError = {
            type: 'field',
            value: '&lt;b&gt;&lt;&#x2F;b&gt;',
            msg: 'File extension is not allowed on &lt;b&gt;&lt;&#x2F;b&gt;',
            path: 'fileName',
            location: 'body'
        }
        await testExpressValidatorMiddleware(reqMock, respMock, uploadRequestValidationRules);
        const result = validationResult(reqMock);

        const errorResult = result.array();
        expect(errorResult).toHaveLength(1);
        expect(errorResult).toEqual(expect.arrayContaining([expectedError]));

    });
});