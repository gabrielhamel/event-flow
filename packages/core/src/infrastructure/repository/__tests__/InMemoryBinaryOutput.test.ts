import { InMemoryBinaryOutput } from "@repo/core/infrastructure/repository/InMemoryBinaryOutput";

describe("in memory binary output", () => {
  it("should have the internal state set to 0 by default", () => {
    const output = new InMemoryBinaryOutput();

    expect(output.state).toEqual(0);
  });

  it("should change the value of the state to 1", async () => {
    const output = new InMemoryBinaryOutput();

    await output.write(1);

    expect(output.state).toEqual(1);
  });
});
