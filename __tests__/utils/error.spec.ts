import { describe, it, expect } from "vitest";
import { formatError, wrapError } from "../../src/utils/error.ts";

describe("formatError", () => {
  it("should extract message from Error instance", () => {
    const error = new Error("Something went wrong");
    expect(formatError(error)).toBe("Something went wrong");
  });

  it("should return string errors as-is", () => {
    expect(formatError("String error")).toBe("String error");
  });

  it("should return default message for unknown types", () => {
    expect(formatError(null)).toBe("Unknown error");
    expect(formatError(undefined)).toBe("Unknown error");
    expect(formatError(42)).toBe("Unknown error");
    expect(formatError({})).toBe("Unknown error");
  });

  it("should use custom default message", () => {
    expect(formatError(null, "Custom default")).toBe("Custom default");
  });
});

describe("wrapError", () => {
  it("should wrap Error with context", () => {
    const error = new Error("Connection refused");
    expect(wrapError(error, "Failed to connect")).toBe("Failed to connect: Connection refused");
  });

  it("should wrap string error with context", () => {
    expect(wrapError("timeout", "Request failed")).toBe("Request failed: timeout");
  });

  it("should wrap unknown error with context", () => {
    expect(wrapError(null, "Operation failed")).toBe("Operation failed: Unknown error");
  });
});
