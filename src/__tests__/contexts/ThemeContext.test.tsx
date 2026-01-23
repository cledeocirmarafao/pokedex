import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  ThemeProvider,
  useTheme,
} from "../../components/contexts/ThemeContext";

describe("ThemeContext Component", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );
  it("It starts with a dark theme by default", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("dark");
  });

  it("Alternate between light and dark when calling toggleTheme", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
  });

  it("Throws an error when used outside of the Provider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within a ThemeProvider");
  });
});
