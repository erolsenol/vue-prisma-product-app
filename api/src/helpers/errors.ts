import { FastifyReply } from "fastify"
import { ERROR500 } from "./constants"

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message)
    this.name = "HttpError"
  }
}

export const ERRORS = {
  invalidToken: new Error('Token is invalid.'),
  userExists: new Error('User already exists'),
  userNotExists: new Error('User not exists'),
  userCredError: new Error('Invalid credential'),
  tokenError: new Error('Invalid Token'),
}

export function handleServerError(reply: FastifyReply, error: unknown) {
  if (error instanceof HttpError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  if (isPrismaError(error)) {
    if (error.code === "P2025") {
      return reply.status(404).send({ message: "Resource not found" })
    }

    if (error.code === "P2003") {
      return reply.status(409).send({ message: "Resource is still referenced" })
    }
  }

  const err = {...ERROR500}

  if (isPrismaError(error) && error.meta?.cause) {
    err.cause = error.meta.cause
  }

  return reply.status(ERROR500.statusCode).send(err);
}

function isPrismaError(error: unknown): error is { code?: string; meta?: { cause?: string } } {
  return typeof error === "object" && error !== null && ("meta" in error || "code" in error);
}
