export class SimpleHttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
