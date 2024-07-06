import util from "util";
import { VercelResponse } from "@vercel/node";

function joinString(input: string | string[] | undefined) {
  if (typeof input === "string") {
    return input;
  }

  if (!input) {
    return "";
  }

  return input.join("");
}

function handleCatch(
  err: any,
  res: VercelResponse,
  method: string = "unknown"
) {
  const statusCode = err.statusCode || 500;
  const message = err.body || { err: util.format(err) };

  res.status(statusCode).send({ ...message, failed: true, method });
}

function generateErrorCode(
  status: number,
  message: string,
  optionalProp?: Record<string, any>
) {
  return {
    body: {
      error: {
        message: message,
        status: status,

        ...optionalProp,

        manual: true,
        timestamp: new Date().getTime(),
      },
    },

    statusCode: status,
  };
}

export { joinString, handleCatch, generateErrorCode };
