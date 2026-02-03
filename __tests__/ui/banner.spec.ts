import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { showBanner, type BannerConfig } from "../../src/ui/banner.ts";

describe("showBanner", () => {
  let consoleClearSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleClearSpy = vi.spyOn(console, "clear").mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleClearSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it("should clear screen by default", () => {
    const config: BannerConfig = {
      title: "Test",
    };

    showBanner(config);

    expect(consoleClearSpy).toHaveBeenCalledOnce();
  });

  it("should not clear screen when clearScreen is false", () => {
    const config: BannerConfig = {
      title: "Test",
      clearScreen: false,
    };

    showBanner(config);

    expect(consoleClearSpy).not.toHaveBeenCalled();
  });

  it("should display the title", () => {
    const config: BannerConfig = {
      title: "Test",
      clearScreen: false,
    };

    showBanner(config);

    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it("should display subtitle when provided", () => {
    const config: BannerConfig = {
      title: "Test",
      subtitle: "Test Subtitle",
      clearScreen: false,
    };

    showBanner(config);

    const calls = consoleLogSpy.mock.calls;
    const hasSubtitle = calls.some((call) =>
      call.some((arg) => typeof arg === "string" && arg.includes("Test Subtitle"))
    );

    expect(hasSubtitle).toBe(true);
  });

  it("should not display subtitle when not provided", () => {
    const config: BannerConfig = {
      title: "Test",
      clearScreen: false,
    };

    showBanner(config);

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  });
});
