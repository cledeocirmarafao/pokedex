import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SearchInput } from "../../components/SearchInput";

describe("SearchInput Component", () => {
  it("Calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchInput value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText(/Search Pokémon.../i);

    await user.type(input, "Pikachu");

    expect(onChange).toHaveBeenCalledTimes(7);
  });

  it("Displays the value controlled by props", () => {
    const onChange = vi.fn();

    render(<SearchInput value="Charizard" onChange={onChange} />);

    const input = screen.getByDisplayValue("Charizard");
    expect(input).toBeInTheDocument();
  });
});
