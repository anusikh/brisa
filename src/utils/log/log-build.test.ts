import { describe, it, expect, mock, afterEach } from "bun:test";
import { logTable } from "./log-build";
import getConstants from "../../constants";

const originalConsoleLog = console.log;
const { LOG_PREFIX } = getConstants();

describe("utils", () => {
  afterEach(() => {
    console.log = originalConsoleLog;
  });
  describe("logTable", () => {
    it("should log a table", () => {
      const info = LOG_PREFIX.INFO;
      const data = [
        { name: "John", age: "23" },
        { name: "Jane", age: "42" },
      ];

      const expected =
        `${info}\n` +
        [" name | age", " -------------", " John | 23 ", " Jane | 42 "]
          .map((t) => info + t)
          .join("\n");

      const mockLog = mock((f, s) => (s ? `${f} ${s}` : f));
      console.log = mockLog;

      logTable(data);

      const output = mockLog.mock.results.map((t) => t.value).join("\n");

      expect(output).toBe(expected);
    });
  });
});