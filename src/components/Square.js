import React from 'react'

// class Square extends React.Component {
    
//     render() {
//       return (
//         <button
//           className="square"
//           onClick={() => this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
//   }
  
 const Square = (props) =>{
   return(
    <button
    className={"square " + (props.isWinning ? "square--winning" : null)}
    onClick={() => props.onClick()}
  >
    {props.value}
  </button>
  );

 }
  
export default Square;