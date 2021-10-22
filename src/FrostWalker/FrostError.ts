export class FrostError extends Error {
    constructor(message: string, name?: string) {
        super();
        this.message = message;
        this.name = name || "FrostError";

        Error.captureStackTrace(this);
    }
}
