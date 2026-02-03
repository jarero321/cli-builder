import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sleep } from "../../src/utils/sleep.ts";

describe("sleep", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return a promise", () => {
    const result = sleep(100);
    expect(result).toBeInstanceOf(Promise);
  });

  it("should resolve after the specified time", async () => {
    let resolved = false;

    const promise = sleep(1000).then(() => {
      resolved = true;
    });

    expect(resolved).toBe(false);

    vi.advanceTimersByTime(500);
    await Promise.resolve();
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(500);
    await promise;
    expect(resolved).toBe(true);
  });

  it("should resolve with undefined", async () => {
    const promise = sleep(100);
    vi.advanceTimersByTime(100);

    const result = await promise;
    expect(result).toBeUndefined();
  });
});
