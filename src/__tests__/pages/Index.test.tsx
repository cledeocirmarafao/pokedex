import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Index } from "../../components/pages/Index";
import { usePokemonList } from "../../components/hooks/usePokemon";
import { ThemeProvider } from "../../components/contexts/ThemeContext";

vi.mock("../../components/hooks/usePokemon.ts");
const mockedUsePokemonList = usePokemonList as any;

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{component}</ThemeProvider>
    </BrowserRouter>,
  );
};

describe("Index Page", () => {
  const mockPokemon = [
    { id: 1, name: "bulbasaur", image: "bulbasaur.png", types: ["grass"] },
    { id: 4, name: "charmander", image: "charmander.png", types: ["fire"] },
    { id: 7, name: "squirtle", image: "squirtle.png", types: ["water"] },
  ];

  function mocked() {
    mockedUsePokemonList.mockReturnValue({
      pokemon: mockPokemon,
      loading: false,
      loadingMore: false,
      loadMore: vi.fn(),
      hasMore: false,
    });
  }

  const user = userEvent.setup();

  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it("Displays a loading spinner while loading Pokémon", () => {
    mockedUsePokemonList.mockReturnValue({
      pokemon: [],
      loading: true,
      loadingMore: false,
      loadMore: vi.fn(),
      hasMore: true,
    });

    renderWithRouter(<Index />);

    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("Renders list of Pokémon after loading", () => {
    mocked();

    renderWithRouter(<Index />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.getByText("squirtle")).toBeInTheDocument();
  });

  it("Filters Pokémon based on search", async () => {
    mocked();

    renderWithRouter(<Index />);

    const searchInput = screen.getByPlaceholderText(/Search Pokémon.../i);
    await user.type(searchInput, "char");

    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
    expect(screen.queryByText("squirtle")).not.toBeInTheDocument();
  });

  it("Displays a message when no Pokémon are found", async () => {
    mocked();
    renderWithRouter(<Index />);

    const searchInput = screen.getByPlaceholderText(/Search Pokémon.../i);
    await user.type(searchInput, "mewtwo");

    expect(
      screen.getByText(/No Pokémon found in loaded results/i),
    ).toBeInTheDocument();
  });

  it("The call loadMore when the button is clicked", async () => {
    const loadMore = vi.fn();

    mockedUsePokemonList.mockReturnValue({
      pokemon: mockPokemon,
      loading: false,
      loadingMore: false,
      loadMore,
      hasMore: true,
    });

    renderWithRouter(<Index />);

    const buttons = screen.getAllByRole("button");
    const loadMoreButton = buttons.find((button) =>
      button.textContent?.toLowerCase().includes("load more"),
    );

    expect(loadMoreButton).toBeDefined();
    await user.click(loadMoreButton!);

    expect(loadMore).toHaveBeenCalledTimes(1);
  });

  it("Disable LoadMore button while charging", () => {
    mockedUsePokemonList.mockReturnValue({
      pokemon: mockPokemon,
      loading: false,
      loadingMore: true,
      loadMore: vi.fn(),
      hasMore: true,
    });

    renderWithRouter(<Index />);

    const loadMoreButton = screen.getByRole("button", { name: /loading/i });
    expect(loadMoreButton).toBeDisabled();
  });

  it("Do not render LoadMore button when doesnt have more pokemon", () => {
    mocked();

    renderWithRouter(<Index />);

    const lodMoreButtons = screen.queryAllByRole("button", {
      name: /load more/i,
    });

    expect(lodMoreButtons).toHaveLength(0);
  });

  it("Refresh list when type is change", async () => {
    mockedUsePokemonList.mockImplementation((type: string) => ({
      pokemon: type === "fire" ? [mockPokemon[1]] : mockPokemon,
      loading: false,
      loadingMore: false,
      loadMore: vi.fn(),
      hasMore: false,
    }));

    const { rerender } = renderWithRouter(<Index />);
    const typeFilter = screen.getByRole("combobox");
    await user.selectOptions(typeFilter, "fire");

    rerender(
      <BrowserRouter>
        <ThemeProvider>
          <Index />
        </ThemeProvider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(mockedUsePokemonList).toHaveBeenCalledWith("fire");
    });
  });
});
