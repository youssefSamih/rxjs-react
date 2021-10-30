import React from "react";
import { useObservableState } from "observable-hooks";
import { usePokemon } from "../store";
import { List } from "./List";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";

const Search = () => {
  const search$ = React.useMemo(() => new BehaviorSubject(""), []);
  const { pokemon$ } = usePokemon();

  const [filteredPokemon] = useObservableState(
    () =>
      pokemon$.pipe(
        combineLatestWith(search$),
        map(([pokemon, search]) =>
          pokemon.filter((p) =>
            p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        )
      ),
    []
  );

  return (
    <div>
      <input
        type="text"
        value={search$.value}
        onChange={(event) => search$.next(event.target.value)}
      />
      <List {...{ filteredPokemon }} />
    </div>
  );
};

export default Search;
