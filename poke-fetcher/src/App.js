import React, { useState, useEffect } from "react";
import "./App.css";

import PokeList from "./components/PokeList";
import PokeDisplay from "./components/PokeDisplay";

function App() {
  const [pokeData, setPokeData] = useState(null);
  const [links, setLinks] = useState({ next: null, prev: null });
  const [modal, setModal] = useState(false);

  const handlePokemon = (url) => {
    setModal(url);
  };

  const handleModalClose = () => {
    setModal(false);
  }

  const handlePrev = () => {
    fetch(links.prev)
      .then((res) => res.json())
      .then((pokemonData) => {
        console.log(pokemonData);
        setPokeData(pokemonData.results);
        setLinks({
          next: pokemonData.next,
          prev: pokemonData.previous,
        });
      });
  };

  const handleNext = () => {
    fetch(links.next)
      .then((res) => res.json())
      .then((pokemonData) => {
        console.log(pokemonData);
        setPokeData(pokemonData.results);
        setLinks({
          next: pokemonData.next,
          prev: pokemonData.previous,
        });
      });
  }

  useEffect(() => {
    if (!pokeData) {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json())
        .then((pokemonData) => {
          console.log(pokemonData);
          setPokeData(pokemonData.results);
          setLinks({
            next: pokemonData.next,
            prev: pokemonData.previous,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="main-wrapper">
      {modal && <PokeDisplay url={modal} handleClose={handleModalClose} />}
      <button
        className="arrow-button"
        onClick={handlePrev}
        disabled={!links.prev}
      >
        {"<"}
      </button>
      <PokeList pokemon={pokeData} handlePokemon={handlePokemon} />
      <button
        className="arrow-button"
        onClick={handleNext}
        disabled={!links.next}
      >
        {">"}
      </button>
    </div>
  );
}

export default App;
