import React from 'react'
import { useObservableState } from 'observable-hooks'
import { usePokemon } from '../store';

const Deck = () => {
  const { deck$ } = usePokemon()
  const deck = useObservableState(deck$, []);
  
  return (
    <div>
      <h4>
        Deck
      </h4>
      {deck.map((p) => (
        <div key={p.id} style={{
          display: 'flex'
        }}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
            alt={p.name}
          />
          <div>
            <div>
              {p.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Deck
