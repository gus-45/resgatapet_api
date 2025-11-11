export class ErrorUtils {
    private errors: string[] = [];

    public addError(message: string): void {
        this.errors.push(message);
    }
    public hasErrors(): boolean {
        return this.errors.length > 0;
    }
    public getErrors(): string[] {
        return this.errors;
    }
    public throwIfHasErrors(defaultMessage: string = "Erros de validação encontrados"): void {
        if (this.hasErrors()) {
            const errorDetails = this.errors.join('|');
            throw new Error(`${defaultMessage}: ${errorDetails}`);
        }
    }
}
