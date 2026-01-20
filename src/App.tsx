import { Index } from "./components/pages/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import { PokemonDetail } from "./components/pages/PokemonDetail";

const queryClient = new QueryClient()

function App(){
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
  )
}

export default App
