import { action, createRequestTypes } from "./ReducerUtil";
import { describe, test, expect } from "vitest";

describe("Reducer Utility Unit Tests", () => {
  test("I can generate a request types object based on a given prefix", () => {
    const result = createRequestTypes("FOO");
    expect(result.REQUEST).toBe("FOO_REQUEST");
    expect(result.SUCCESS).toBe("FOO_SUCCESS");
    expect(result.FAILURE).toBe("FOO_FAILURE");
  });

  test("When empty prefix is provided, an error should be thrown", () => {
    expect(() => createRequestTypes("")).toThrow(Error);
    expect(() => createRequestTypes("")).toThrow(
      "You must provide a valid prefix"
    );
  });

  test("When valid params are provided, including an object for payload, return action object", () => {
    const result = action("FOO_SUCCESS", { foo: "bar" });
    expect(result.type).toBe("FOO_SUCCESS");
    expect(result.payload).toStrictEqual({ foo: "bar" });
  });

  test("When valid params are provided, including an string for payload, return action object", () => {
    const result = action("FOO_SUCCESS", "bar");
    expect(result.type).toBe("FOO_SUCCESS");
    expect(result.payload).toStrictEqual("bar");
  });

  test("When empty type is provided, an error should be thrown", () => {
    expect(() => action("", {})).toThrow(Error);
    expect(() => action("", {})).toThrow(
      "You must provide a valid action type"
    );
  });
});
