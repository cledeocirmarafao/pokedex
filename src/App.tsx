import { PokemonCard } from "./components/PokemonCard"
import { SplashScreen } from "./components/SplashScreen"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePokemonList } from "./components/hooks/usePokemon"
import { usePokemonDetails } from "./components/hooks/usePokemon";

function App(){
  return (
    <>
    <SplashScreen/>
    </>
  )
}

export default App
