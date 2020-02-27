import { renderHook, act } from "@testing-library/react-hooks";
import UseTypedText, { useTypedText } from "./";
import useTypedTextHook from "./useTypedText";


UseTypedText.setOptions({ humanElement: false });


// mock timer using jest
jest.useFakeTimers();

describe("useTypedText", () => {
  it('updates at a set speed', () => {
    const { result } = renderHook(() => useTypedText());

    const [value, setTypeTo] = result.current;

    expect(value).toEqual("- ");

    act(() => {
      setTypeTo("hi");
    });

    expect(result.current[0]).toEqual("> ▓");

    // Fast-forward
    act(() => {
      jest.advanceTimersByTime(60);
    });

    expect(result.current[0]).toEqual("> h▓");

    // Fast-forward
    act(() => {
      jest.advanceTimersByTime(60);
    });

    expect(result.current[0]).toEqual("> hi▓");

    // Fast-forward
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current[0]).toEqual("- hi");
  });
});

describe("useTypedTextHook", () => {
  it("should be able to run without a global", () => {
    const { result } = renderHook(() => useTypedTextHook());

    expect(result.current[0]).toEqual("");
  });

  it("should initialize with text and allow resetting the target text on the fly", () => {
    const { result } = renderHook(() => useTypedTextHook());

    expect(result.current[0]).toEqual("");

    act(() => {
      result.current[1]("foobar");
      jest.advanceTimersByTime(50);
    });

    expect(result.current[0]).toEqual("f");

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current[0]).toEqual("fo");

    act(() => {
      result.current[1]("");
      jest.advanceTimersByTime(50);
    });

    expect(result.current[0]).toEqual("");
  });
});

describe("Global settings", () => {
  it("should export a global", () => {
    expect(UseTypedText.toString()).toMatch("\"typeSpeed\": 60");
    expect(UseTypedText.toString()).toMatch("\"skipSpace\": true");
  });

  it("should allow setting/unsetting global settings", () => {
    UseTypedText.setOptions();
    UseTypedText.setOptions({ typeSpeed: 100 });
    expect(UseTypedText.toString()).toMatch("\"typeSpeed\": 100");

    UseTypedText.resetOptions();
    expect(UseTypedText.toString()).toMatch("\"typeSpeed\": 60");
  });

  it("should return a random keystroke speed", () => {
    UseTypedText.setOptions();
    UseTypedText.setOptions({ humanElement: true });
    expect(UseTypedText.getStrokeSpeed() <= 110).toEqual(true);
    expect(UseTypedText.getStrokeSpeed() > 0).toEqual(true);

    UseTypedText.setOptions({ humanElement: false });
    expect(UseTypedText.getStrokeSpeed()).toEqual(60);
  });

  it("should get decorations around the returned text", () => {
    expect(UseTypedText.getDecoration(false)).toEqual(["- ", ""]);

    expect(UseTypedText.getDecoration(true)).toEqual(["> ", "▓"]);
  });

  it("should allow typeSpeed settings", () => {
    UseTypedText.setOptions({ typeSpeed: 500, humanElement: false });

    const { result } = renderHook(() => useTypedText());

    act(() => {
      result.current[1]("hello");
    });

    expect(result.current[0]).toEqual("> ▓");

    // Fast-forward
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current[0]).toEqual("> h▓");
  });
});
