import React, { useState, useEffect } from "react";

const PokeDisplay = ({ url, handleClose }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (!pokemon) {
      fetch(url)
        .then((res) => res.json())
        .then((pokemonObject) => {
          let pokeObject = {
            name: pokemonObject.name,
            sprite: pokemonObject.sprites.front_default,
            types: pokemonObject.types,
            height: pokemonObject.height,
            weight: pokemonObject.weight,
          };
          setPokemon(pokeObject);
        });
    }
  }, [pokemon, url]);

  return (
    <div id="poke-display">
      {pokemon ? (
        <div id="inner-poke-display">
          <button
            id="close-button"
            onClick={() => {
              handleClose();
              setPokemon(null);
            }}
          >
            X
          </button>
          <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
          <div className="sprite-wrapper">
            <img
              className="poke-sprite"
              src={pokemon.sprite}
              alt={pokemon.name}
            />
          </div>
          <p>
            {pokemon.types
              .map((type) => type.type.name[0].toUpperCase() + type.type.name.slice(1))
              .join(" / ")}
          </p>
          <p>
            {`Height: ${Math.round(
              Math.floor((pokemon.height * 3.937) / 12)
            )}' ${((pokemon.height * 3.937) % 12).toFixed(1)}"`}
          </p>
          <p>{`Weight: ${Math.round(pokemon.weight / 4.536)} lbs`}</p>
        </div>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
};

export default PokeDisplay;
