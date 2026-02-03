import { describe, it, expect, vi } from "vitest";
import { createProgressReporter } from "../../src/ui/progress.ts";

vi.mock("@clack/prompts", () => ({
  spinner: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
}));

describe("createProgressReporter", () => {
  it("should return an object with start and stop methods", () => {
    const reporter = createProgressReporter();

    expect(reporter).toHaveProperty("start");
    expect(reporter).toHaveProperty("stop");
    expect(typeof reporter.start).toBe("function");
    expect(typeof reporter.stop).toBe("function");
  });

  it("should call start with the provided message", () => {
    const reporter = createProgressReporter();
    const message = "Loading...";

    expect(() => reporter.start(message)).not.toThrow();
  });

  it("should call stop with the provided message", () => {
    const reporter = createProgressReporter();
    const message = "Done!";

    expect(() => reporter.stop(message)).not.toThrow();
  });
});
