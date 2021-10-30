import React from 'react'
import { Pokemon, usePokemon } from '../store'

interface ListProps {
  filteredPokemon: Array<Pokemon>
}

export const List = ({ filteredPokemon }: ListProps) => {
  const { selected$ } = usePokemon()

  return (
    <div>
        {filteredPokemon.map(p => (
          <div key={p.name}>
            <input
              type="checkbox"
              checked={p.selected}
              onChange={() => {
                if (p.selected) {
                  selected$.next(selected$.value.filter(id => id !== p.id))
                } else {
                  selected$.next([...selected$.value, p.id])
                }
              }}
            />
            <strong> {p.name} </strong> - {p.power}
          </div>
        ))}
      </div>
  )
}
