import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Demo from './demo';

const useCountDown = (initCount: number) => {
  const [count, setCount] = useState(initCount);

  useEffect(() => {
    const interval = setInterval(() => setCount(v => v + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return [count]
}

function App() {
  const [count, setCount] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    let interval: null | NodeJS.Timer = null
    if (startCounting) {
      interval = setInterval(() => setCount(v => v + 1), 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [startCounting])

  const handleToggle = () => {
    const f = flag;
    setFlag(!f)
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <button onClick={() => setStartCounting((v) => !v)}>点击计时</button>
      <div>{count}</div>
      <button onClick={handleToggle}>toggle</button>
      {/* <div>{flag ? 'true' : 'false'}</div> */}
      <Demo />
    </div>
  );
}

export default App;
