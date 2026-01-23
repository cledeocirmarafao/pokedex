import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "../../components/contexts/ThemeContext";
import { ThemeToggle } from "../../components/ThemeToggle";

const renderWithTheme = () => {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
};

describe("ThemeToggle Component", () => {
  it("It switches between themes when clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme();

    const button = screen.getByRole("button", { name: /toggle theme/i });

    expect(screen.getByRole("button")).toContainElement(
      document.querySelector(".lucide-sun") as HTMLElement,
    );

    await user.click(button);

    expect(screen.getByRole("button")).toContainElement(
      document.querySelector(".lucide-moon") as HTMLElement,
    );
  });
});
