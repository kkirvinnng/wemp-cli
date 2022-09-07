export class AppError extends Error {
    message: string
    code: number
    name: string
    constructor(name: string, code: number, message: string) {
        super(name)
        this.name = name
        this.message = message
        this.code = code
    }
}
export default AppError