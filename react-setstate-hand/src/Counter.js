import React from 'react';
import ReactDom from 'react-dom';
class Counter extends React.PureComponent {
  state =  {number: 0}
  /**
   * @param {*} event 
   */
  handleClick = (event) => {
    debugger
    this.setState((prevState) => ({number: prevState.number + 1}));
    console.log('setState1', this.state);
    this.setState((prevState) => ({number: prevState.number + 1}));
    console.log('setState2', this.state);
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

export default Counter;