import React, { Component } from 'react';
import Board from './Board'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  restartGame(){
    const squares = Array(9).fill(null);
    const history = null;
    const xIsNext = true;
    const stepNumber = 0;
    this.setState({
      history:([{
        squares: squares,
      }]),
      stepNumber: stepNumber,
      xIsNext: xIsNext,
    });
} 
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if(caculateWinner(squares)|| squares[i]){
        return;
    }
    squares[i] =this.state.xIsNext ? 'X' : 'O';
    this.setState({
        history:history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext:!this.state.xIsNext,
    });
}  
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) ===0,
    });
  }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = caculateWinner(current.squares);
      const draw = checkDraw(current.squares);
      const moves = history.map((step, move ) =>{
          const desc = move ?
          'Go to move #' + move:
          'Go to game start';
          return(
            <li key = {move}>
              <button onClick = {() =>this.jumpTo(move)}>{desc}</button>
            </li>
          )
        })
        let status;
        if(winner)
        {
            status = 'Winner : ' + winner;
        }
        else if(draw)
        {
            status = 'Draw';
        }
        else{
            status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
          <div>{ status}</div>
            <Board 
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
              restartGame = {() => this.restartGame()}/>
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
export default Game;
function caculateWinner(squares){
  const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
  ];
  for(let i =0; i<lines.length;i++){
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
      }
  }
  return null;
}
function checkDraw(squares){
  for(let i=0; i<squares.length;i++){
      if(caculateWinner(squares))
          return false;
      if(squares[i] == null)
       return false;
  }
  return true;
}