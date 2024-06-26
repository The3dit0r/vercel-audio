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

export { joinString, convertType };
