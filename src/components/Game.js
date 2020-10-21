import React, { useState } from 'react';
import Board from './Board'
import {caculateWinner} from '../helper';
import {checkDraw} from '../helper';

const Game = () =>{
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [isDescending, setIsDescending] = useState(true);
  const winner = caculateWinner(history[stepNumber]);
  const draw = checkDraw(history[stepNumber]);
  
  const handleClick = i =>{
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    if(caculateWinner(squares)|| squares[i]){
        return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  };
  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    
  };
  const restartGame = () =>{
    const squares = Array(9).fill(null);
    const history = [squares];
    const xIsNext = true;
    const stepNumber = 0;
    setHistory(history);
    setStepNumber(stepNumber);
    setXIsNext(xIsNext);
  }
 
  const reverseHistory = () =>{
    setIsDescending(!isDescending);
    
  }
  const moves = history.map((step, move ) =>{
    const desc = move ?
    'Go to move #' + move:
    'Go to game start';
    return(
      <li key = {move}>
        <button className="moveBtn" onClick = {() => jumpTo(move)}>{move == stepNumber ? <b>{desc}</b> : desc}</button>
      </li>
    )
  })
  const renderStatus = () =>{
    let status;
    if(winner){
      status = 'Winner : ' + winner.player ;
    }
    else if(draw){
      status = "Draw";
    }
    else{
      status = 'Next player: ' + (xIsNext? 'X' : 'O');
    }
    return(
      <div className = "status">{status}</div>
    );
  }
  return (
    <div className="game">
      <div className="game-board">
        {renderStatus()}
        <Board 
        winningSquares={winner ? winner.line : []} 
        squares={history[stepNumber]} 
        onClick={(i) => handleClick(i)} 
        />
        <button className="restartBtn" onClick={() => restartGame()}>
        Restart
        </button>
        <button className="restartBtn" onClick={() => reverseHistory()}>
        Sort by: {isDescending ? "Descending" : "Asending"}
        </button>
      </div>
      <div className="game-info">
        <ol >{isDescending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}
// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null)
//       }],
//       xIsNext: true,
//       stepNumber: 0,
//     };
//   }
//   restartGame(){
//     const squares = Array(9).fill(null);
//     const history = null;
//     const xIsNext = true;
//     const stepNumber = 0;
//     this.setState({
//       history:([{
//         squares: squares,
//       }]),
//       stepNumber: stepNumber,
//       xIsNext: xIsNext,
//     });
// } 
//   handleClick(i){
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length -1];
//     const squares = current.squares.slice();
//     if(caculateWinner(squares)|| squares[i]){
//         return;
//     }
//     squares[i] =this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//         history:history.concat([{
//           squares: squares,
//         }]),
//         stepNumber: history.length,
//         xIsNext:!this.state.xIsNext,
//     });
// }  
//   jumpTo(step){
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step%2) ===0,
//     });
//   }
//     render() {
//       const history = this.state.history;
//       const current = history[this.state.stepNumber];
//       const winner = caculateWinner(current.squares);
//       const draw = checkDraw(current.squares);
      // const moves = history.map((step, move ) =>{
      //     const desc = move ?
      //     'Go to move #' + move:
      //     'Go to game start';
      //     return(
      //       <li key = {move}>
      //         <button onClick = {() =>this.jumpTo(move)}>{desc}</button>
      //       </li>
      //     )
      //   })
//         let status;
//         if(winner)
//         {
//             status = 'Winner : ' + winner;
//         }
//         else if(draw)
//         {
//             status = 'Draw';
//         }
//         else{
//             status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
//         }
//       return (
//         <div className="game">
//           <div className="game-board">
//           <div>{ status}</div>
//             <Board 
//               squares = {current.squares}
//               onClick = {(i) => this.handleClick(i)}
//               restartGame = {() => this.restartGame()}/>
//           </div>
//           <div className="game-info">
//             <ol>{moves}</ol>
//           </div>
//         </div>
//       );
//     }
//   }
export default Game;
