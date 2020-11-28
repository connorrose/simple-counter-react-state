import React, { useState, useEffect, useRef } from 'react';

const useLocalStorage = (key, initialState) => {
  const get = () => {
    const value = localStorage.getItem(key);
    if (value !== undefined) {
      return JSON.parse(value);
    }
    return initialState;
  }
  
  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue];
}

/* ----- COMPONENT ----- */
const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage('count', 0);
  const countRef = useRef();

  let message ='';
  if (countRef.current < count) message = 'Higher';
  else if (countRef.current > count) message = 'Lower';
  countRef.current = count;
  
  useEffect(() => {
    document.title = `Count: ${count}`
    // const id = setInterval(() => console.log(count), 2500)
    // CLEANUP //
    // return () => clearInterval(id);
  }, [count])

  const increment = () => {
    // updater function does NOT get props
    if (count < max) setCount(state => state + step);
  }
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="Counter">
      <p>{message}</p>
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
