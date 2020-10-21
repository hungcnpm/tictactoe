function Square(props) {
    console.log("Square() for " + props.value); // temp                 // #58D68D Win color; #F5B7B1 click color
    if (props.winhighlight === true) {
      console.log("Winner square for:" + props.sqID);
      const divStyle = {
        backgroundColor: "#58D68D"
      };
      return (
        <button // Render button On Win
          className="square"
          id={props.sqID}
          style={divStyle}
        >
          {props.value}
        </button>
      );
    }
    return (
      <button // Render button On normal Click
        className="square"
        id={props.sqID}
        onClick={() => {
          props.onClick();
          document.getElementById(props.sqID).style.background = "#F5B7B1"; // Highligting click
        }}
      >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null), // initializing
        xIsNext: true
      };
    }
  
    handleClick(i) {
      console.log("handleClick(i) for " + i); // temp
      const squares1 = this.state.squares.slice(); // Copying and creating a new Array
      if (calculateWinner(squares1) || squares1[i]) {
        return;
      }
  
      squares1[i] = this.state.xIsNext ? "X" : "O"; // Write Move on the right location in Square
      this.setState({
        squares: squares1,
        xIsNext: !this.state.xIsNext
      });
    }
  
    renderSquare(i, doHighlight) {
      console.log("renderSquare(i) for " + i); // temp
      return (
        <Square
          sqID={"square" + i}
          winhighlight={doHighlight}
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const results = calculateWinner(this.state.squares);
      let winner;
      let status;
      let highlight = Array(9).fill(false);
      if (results) {
        winner = results[0];
        status = "Winner: " + winner;
  
        highlight[results[1][0]] = true;
        highlight[results[1][1]] = true;
        highlight[results[1][2]] = true;
        console.log(highlight);
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      //const squareValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  
      return (
        <div>
          <div className="status">{status}</div>
  
          <div className="board-row">
            {this.renderSquare(0, highlight[0])}
            {this.renderSquare(1, highlight[1])}
            {this.renderSquare(2, highlight[2])}
          </div>
          <div className="board-row">
            {this.renderSquare(3, highlight[3])}
            {this.renderSquare(4, highlight[4])}
            {this.renderSquare(5, highlight[5])}
          </div>
          <div className="board-row">
            {this.renderSquare(6, highlight[6])}
            {this.renderSquare(7, highlight[7])}
            {this.renderSquare(8, highlight[8])}
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
  
  function calculateWinner(squares) {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (
        squares[a] &&
        squares[b] &&
        squares[c] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [squares[a], winLines[i]];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  function renderBoard(size){
    let rows = [];
      for(let i=0;i<size;i++){
         rows.push(<div className = "board-row"></div>);
          for(let j=0;j<size;j++){
            rows.push(renderSquare(i*size+j));
          }
      }
      return(rows);
  } 