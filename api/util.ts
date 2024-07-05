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

function convertType(input: string | string[]): "lyrics" | "stream" {
  const filtered = joinString(input).toLowerCase();

  switch (filtered) {
    case "lyrics": {
      return "lyrics";
    }

    case "stream": {
      return "stream";
    }

    default: {
      return "stream";
    }
  }
}

function handleCatch(
  err: any,
  res: VercelResponse,
  method: string = "unknown"
) {
  const statusCode = err.statusCode || 500;
  const message = err.body || { err };

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

export { joinString, convertType, handleCatch, generateErrorCode };
