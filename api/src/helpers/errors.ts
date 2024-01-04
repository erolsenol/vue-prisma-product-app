import { FastifyReply } from "fastify"
import { ERROR500 } from "./constants"

export const ERRORS = {
  invalidToken: new Error('Token is invalid.'),
  userExists: new Error('User already exists'),
  userNotExists: new Error('User not exists'),
  userCredError: new Error('Invalid credential'),
  tokenError: new Error('Invalid Token'),
}

export function handleServerError(reply: FastifyReply, error: any) {
  const err = {...ERROR500}

  if(error?.meta?.cause) {
    err.cause = error.meta.cause
  }

  return reply.status(ERROR500.statusCode).send(err);
}