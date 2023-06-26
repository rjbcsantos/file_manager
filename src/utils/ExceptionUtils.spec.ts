import { getErrorMessage } from "./ExceptionUtils";

class ClassThatExtendsError extends Error {
    constructor(message: string) {
        super(message);
    }
}

describe('ExceptionUtils::getErrorMessage', () => {
    test('when an Error exception is passed as a parameter', () => {
        const errorMessage = "An unknown error has occurred."
        expect(getErrorMessage(new Error(errorMessage))).toBe(errorMessage)
    });

    test('when a class that extends Error is passed as a parameter', () => {
        const errorMessage = "An unknown error has occurred."
        const error = new ClassThatExtendsError(errorMessage);
        expect(getErrorMessage(error)).toBe(errorMessage)
    });

    test('when a string is passed as a parameter', () => {
        const errorMessage = "An unknown error has occurred."
        expect(getErrorMessage(errorMessage)).toBe(errorMessage)
    });

    test('when a null value is passed as a parameter', () => {
        expect(getErrorMessage(null)).toBe("")
    });

    test('when an undefined value is passed as a parameter', () => {
        expect(getErrorMessage(undefined)).toBe("")
    });
});