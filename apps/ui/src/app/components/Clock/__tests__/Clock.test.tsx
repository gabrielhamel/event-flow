import { Clock } from "@/app/components/Clock/Clock";
import { act, render } from "@/tests/testingLibrary";

describe("clock", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should show the current time", () => {
    vi.useFakeTimers();

    const date = new Date("2025-08-09T08:00:00.000Z");
    vi.setSystemTime(date);

    const { getByText } = render(<Clock />);

    expect(getByText(/8:00 AM/u)).toBeInTheDocument();
  });

  it("should update the clock every seconds", async () => {
    const date = new Date("2025-08-09T08:00:00.000Z");
    vi.setSystemTime(date);

    const { getByText } = render(<Clock />);

    const oneMinuteAfter = new Date("2025-08-09T08:01:00.000Z");
    vi.setSystemTime(oneMinuteAfter);

    await act(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 1000);
        }),
    );

    expect(getByText(/8:01 AM/u)).toBeInTheDocument();
  });
});
