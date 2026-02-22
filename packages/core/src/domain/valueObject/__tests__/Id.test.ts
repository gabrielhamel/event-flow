import { Id } from "@repo/core/domain/valueObject/Id";
import * as uuid from "uuid";

describe("id", () => {
  it("should create an id with a name and a hash", () => {
    const hash = uuid.v7();
    const id = Id.create("name", hash);
    const expected = Id.fromString(`name_${hash}`);

    expect(id.equals(expected)).toBeTruthy();
  });

  it("should reject badly formated id", () => {
    const hash = uuid.v7();

    expect(() => Id.fromString(hash)).toThrow();
  });
});
