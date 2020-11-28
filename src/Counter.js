import React, { useState, useEffect } from 'react';

const getStateFromLocalStore = (key) => {
  const value = localStorage.getItem(key);
  if (value !== undefined) {
    return JSON.parse(value);
  }
}

const storeStateInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ----- COMPONENT ----- */
const Counter = ({ max, step }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedCount = getStateFromLocalStore('count');
    if (storedCount) setCount(storedCount);
  }, [])
  
  useEffect(() => {
    document.title = `Count: ${count}`
    storeStateInLocalStorage('count', count)
  }, [count])

  const increment = () => {
    // updater function does NOT get props
    if (count < max) setCount(state => state + step);
  }
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
}

export default Counter;
