export class FrostError extends Error {

    constructor(public message: string, public name = "FrostError") {
        super();
        Error.captureStackTrace(this);
    }

}