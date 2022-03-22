import React from 'react';

export default class extends React.Component {
  state =  {number: 0};
  handleClick = () => {
    // react 17
    this.setState({number: this.state.number + 1}); // 0
    console.log(this.state);
    this.setState({number: this.state.number + 1}); // 0
    console.log(this.state);
    setTimeout(() => {
      this.setState({number: this.state.number + 1}); // 2(react17)   1 (react18)
      console.log(this.state);
      this.setState({number: this.state.number + 1}); // 3(react17)    1 (react18)
      console.log(this.state);
    })
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