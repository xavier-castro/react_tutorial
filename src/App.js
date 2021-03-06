import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";

import "./App.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// The Square component is now considered a coontrolled component because the Board has full control over it
function Square(props) {
  return (
    <button
      className={"square " + (props.isWinning ? "winningSquare" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        isWinning={this.props.winningSquares.includes(i)}
        key={"square " + i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderSquares(n) {
    let squares = [];
    for (let i = n; i < n + 3; i++) {
      squares.push(this.renderSquare(i));
    }
    return squares;
  }

  renderRows(i) {
    return <div className="board-row">{this.renderSquares(i)}</div>;
  }

  render() {
    return (
      <div className="boardContainer">
        {this.renderRows(0)}
        {this.renderRows(3)}
        {this.renderRows(6)}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0,
      isDescending: true
    };
  }

  handleClick(i) {
    const locations = [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3]
    ];

    // .slice() is used to create a copy of squares array
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: locations[i]
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  sortHistory() {
    this.setState({
      isDescending: !this.state.isDescending
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" + move + " @ " + history[move].location
        : "Go to game start";
      return (
        <li key={move}>
          <Button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}
          </Button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner.player + " @ " + winner.line;
    } else if (!current.squares.includes(null)) {
      status = "Draw";
    } else {
      status = "Next: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-info">
          <ol>{this.state.isDescending ? moves : moves.reverse()}</ol>
          <Button
            onclick={() => this.sortHistory()}
            icon={this.state.isDescending ? "sort-desc" : "sort-asc"}
          />
        </div>
        <div className="game-board">
          <div className="statusStyle">{status}</div>
          <Board
            winningSquares={winner ? winner.line : []}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="appContainer">
      <div className="cardContainer">
        <Card interactive={true} elevation={Elevation.ONE}>
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
          <Game />
        </Card>
      </div>
    </div>
  );
}
export default App;
