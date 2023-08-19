

export default class DatabaseError extends Error {
    message: string;
    userMessage: string;
    name: string;
    status: number;
    code?: string;

    constructor(error: any) {
        super(error.message);
        this.userMessage = 'Internal server error';
        this.message = error.message;
        this.message = `Code ${error.code} : ${error.message} `;
        this.name = "DatabaseError";
        this.status = 500;
    }
}