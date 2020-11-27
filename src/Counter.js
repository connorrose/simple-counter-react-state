import React, { Component } from 'react';

/* ----- HELPERS ----- */
// setState function can be extracted out for testing
// Current state & components props are both passed in
const increment = (state, props) => {
  const { count } = state;
  const { max, step } = props;
  if (count >= max) return;
  return { count: count + step }
}

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
}

const updateTitleAndLocalStorage = (state) => {
  const { count } = state;
  document.title = `Count: ${count}`;
  localStorage.setItem('counterState', JSON.stringify(state));
}

/* ----- COMPONENT ----- */
class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = getStateFromLocalStorage();
    document.title = `Count: ${this.state.count}`
    
    this.passStateToCallback = this.passStateToCallback.bind(this);
    this.updateTitleOnly = this.updateTitleOnly.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Utility for passing state to callbacks
  passStateToCallback(callback) {
    return () => callback(this.state);
  }

  // Alternative pattern for reusing state callbacks with this
  updateTitleOnly() {
    document.title = `Count: ${this.state.count}`
  }

  // 2nd arg: optional callback to setState
  // runs after state update & receives no args
  increment() {
    this.setState(increment, this.passStateToCallback(updateTitleAndLocalStorage));
  }

  decrement() {
    this.setState({ count: this.state.count - 1 }, this.updateTitleOnly);
  }

  reset() {
    this.setState({ count: 0 }, this.updateTitleOnly);
  }

  render() {
    return (
      <div className="Counter">
        <p className="count">{this.state.count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
