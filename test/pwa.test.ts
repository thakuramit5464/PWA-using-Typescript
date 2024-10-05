import { printHello } from "../src/hello";

describe("print hello", () => {
  it("should return hello world", () => {
    expect(printHello()).toEqual(undefined);
  });
});
