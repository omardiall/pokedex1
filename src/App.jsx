import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
