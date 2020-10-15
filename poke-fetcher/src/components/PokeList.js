import React from "react"

const PokeList = (props) => (
  <div id="poke-list">
    {props.pokemon ? (
      props.pokemon.map((pokemon) => (
        <div
          className="poke-list-item"
          key={pokemon.name}
          onClick={()=>{props.handlePokemon(pokemon.url)}}
        >
          <p>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
        </div>
      ))
    ) : (
      <p>...loading</p>
    )}
  </div>
)

export default PokeList;