import { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";

describe("non empty string", () => {
  it("should create a valid object", () => {
    const vo = NonEmptyString.create("Hello");

    expect(vo.toString()).toEqual("Hello");
  });

  it("should throw an error if the string is empty", () => {
    expect(() => NonEmptyString.create("")).toThrow();
  });
});
