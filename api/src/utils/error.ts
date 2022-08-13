export class StatusError extends Error {
  constructor(public status: number, message?: string) {
    super(message);
  }
}

export const createError = (status: number, message: string) => {
  const err: Error = new StatusError(status, message);
  return err;
};
