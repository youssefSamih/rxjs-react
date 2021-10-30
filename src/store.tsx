import { createContext, useContext } from "react";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";

export interface Pokemon {
  id: number;
  name: string;
  type: Array<string>;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  power: number;
  selected?: boolean
}

const rowPokemon$ = new BehaviorSubject<Array<Pokemon>>([]);

const pokemonWithPower$ = rowPokemon$.pipe(
  map((pokemon) =>
    pokemon.map((p) => ({
      ...p,
      power:
        p.hp +
        p.attack +
        p.defense +
        p.special_attack +
        p.special_defense +
        p.speed,
    }))
  )
);

const selected$ = new BehaviorSubject<Array<number>>([]);

const pokemon$ = pokemonWithPower$.pipe(
  combineLatestWith(selected$),
  map(([pokemon, selected]) => pokemon.map((p) => ({
    ...p,
    selected: selected.includes(p.id)
  })))
)

const deck$ = pokemon$.pipe(
  map((pokemon) => pokemon.filter((p) => p.selected))
)

fetch("/pokemon-simplified.json")
  .then((res) => res.json())
  .then((data) => rowPokemon$.next(data));


const PokemonContext = createContext({
  pokemon$,
  selected$,
  deck$
})

export const usePokemon = () => useContext(PokemonContext)

export const PokemonProvider: React.FunctionComponent = ({ children }) => (
  <PokemonContext.Provider value={{
    pokemon$,
    selected$,
    deck$
  }}>
    {children}
  </PokemonContext.Provider>
)
