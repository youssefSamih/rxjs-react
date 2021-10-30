import React from 'react';
import './App.css';
import Deck from './components/Deck';
import Search from './components/Search';
import { PokemonProvider } from './store';

function App() {
  return (
    <PokemonProvider>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      }}>
        <Search />
        <Deck />
      </div>
    </PokemonProvider>
  );
}

export default App;
