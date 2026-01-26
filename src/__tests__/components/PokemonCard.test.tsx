import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { PokemonCard } from "../../components/PokemonCard";
import React from "react";

const renderWithRoute = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("PokemonCard Component", () => {
  const mockPokemon = {
    id: 149,
    name: "dragonite",
    image: "https://example.com/dragonite.png",
  };

  it("Renders Pokémon information correctly", () => {
    renderWithRoute(<PokemonCard {...mockPokemon} />);

    expect(screen.getByText("dragonite")).toBeInTheDocument();
    expect(screen.getByText("#149")).toBeInTheDocument();
    expect(screen.getByAltText("dragonite")).toHaveAttribute(
      "src",
      mockPokemon.image,
    );
  });

  it("Navigate to the details page by clicking", () => {
    renderWithRoute(<PokemonCard {...mockPokemon} id={9} />);

    expect(screen.getByText("#009")).toBeInTheDocument();
  });
});
