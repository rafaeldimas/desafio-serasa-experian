export class DomainError extends Error {
  private readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }

  getMessage(): string {
    return this.message;
  }

  getCode(): string {
    return this.code;
  }
}
