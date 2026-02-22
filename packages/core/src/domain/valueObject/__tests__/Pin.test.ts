import { Pin } from "@repo/core/domain/valueObject/Pin";

describe("pin", () => {
  it("should create a valid PIN", () => {
    const vo = Pin.create("1234");

    expect(vo.toString()).toEqual("1234");
  });

  it("should throw an error if the pin is not 4 char", () => {
    expect(() => Pin.create("123")).toThrow();
  });

  it("should throw an error if the pin is made of digits", () => {
    expect(() => Pin.create("abcd")).toThrow();
  });
});
