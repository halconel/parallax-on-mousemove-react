import React, { useRef } from 'react';
import Wrapper from './Parallax/Wrapper';
import logo from '../logo.svg';
import '../styles/App.scss';
import '../styles/Parallax.scss'

function App() {
  const layers = [
    { node: useRef<HTMLDivElement>(null), name: 'background', disallow: 'y', deep: -150 },
    { node: useRef<HTMLDivElement>(null), name: 'clouds', deep: -100 },
    { node: useRef<HTMLDivElement>(null), name: 'red wing pilot', deep: 50, origin: '45% 100%', factorX: 3.5, factorY: 2.8 },
    { node: useRef<HTMLDivElement>(null), name: 'white wing pilot', deep: 33, origin: '45% 100%', factorX: 2.2, factorY: 2.2 },
    { node: useRef<HTMLDivElement>(null), name: 'bridge', deep: 28, origin: '45% 100%', factorX: 3.3, factorY: 2.8 },
  ]

  return (
    <div className="App">
      <section className="App-header">
        <Wrapper layers={layers} />
        <div className="App-logo-wrapper">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </section>
    </div>
  );
}

export default App;
