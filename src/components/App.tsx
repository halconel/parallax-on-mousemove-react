import React, { useRef } from 'react';
import Wrapper from './Parallax/Wrapper';
import logo from '../logo.svg';
import { ILayerSetup } from './Parallax/parallax';
import '../styles/App.scss';
import '../styles/Parallax.scss'

function App() {
  const layers: ILayerSetup[] = [
    { name: 'back', disallow: 'y', deep: -150, node: useRef<HTMLDivElement>(null) },
    { name: 'clouds', deep: -100, node: useRef<HTMLDivElement>(null) },
    { name: 'wing-red', deep: 50, origin: '45% 100%', factorX: 3.5, factorY: 2.8, node: useRef<HTMLDivElement>(null) },
    { name: 'wing-white', deep: 33, origin: '45% 100%', factorX: 2.2, factorY: 2.2, node: useRef<HTMLDivElement>(null) },
    { name: 'exit-bridge', deep: 28, origin: '45% 100%', factorX: 3.3, factorY: 2.8, node: useRef<HTMLDivElement>(null) },
  ]

  return (
    <div className='App'>
      <section className='App-header'>
        <Wrapper layers={layers} />
        <div className='App-logo-wrapper'>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
      </section>
      <div className='DEBUG'><p>o</p></div>
    </div>
  );
}

export default App;
