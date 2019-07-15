import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";

import "./App.css";

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({ squares: squares });
  }

  renderSquare(i) {
    return (
      // We are now passing 2 props from Board to Square: (1): value and (2): onClick
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="appContainer">
      <div className="cardContainer">
        <Card interactive={true} elevation={Elevation.ONE} className="grow">
          <h1>
            <a href="https://reactjs.org/tutorial/tutorial.html">
              Intro to React & BlueprintJS
            </a>
          </h1>
          <p className="paragraphPadding">
            React tutorial practicing the fundamental concepts of layout, props,
            state, and child to parent relationships via creation of a
            tic-tac-toe game.
          </p>
          <Button icon="star" text="Begin Game" intent="success" />
        </Card>
      </div>
    </div>
  );
}

export default App;
