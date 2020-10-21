import React, { Component } from "react";
import Square from "./Square";

const Board = (props) => {
  function renderSquare(i) {
    return <Square 
    isWinning={props.winningSquares.includes(i)}
    key={"square " + i} 
    value={props.squares[i]} 
    onClick={() => props.onClick(i)} />;
  }
  function renderSquares(n, size) {
    let squares = [];
    for (let i = n; i < n+size; i++) {
      squares.push(renderSquare(i));
    }
    return squares;
  }
  function renderRows(i, size) {
    return <div className="board-row">{renderSquares(i, size)}</div>;
  }
  function renderBoards(size){
    let rows=[];
    for(let i=0;i<size;i++){
      rows.push(renderRows(size*i, size));
    }
    return (rows);
  }
  return (
    <div>
      {renderBoards(3)}
    </div>
  );
};

export default Board;
