import React from '../src/react';
import ReactDom from '../src/react-dom';

class FaterComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log('father 1.init')
  }
  state = {
    number: 0,
  }

  componentWillMount() {
    console.log('father 2.componentWillMount')
  }

  componentDidMount() {
    console.log('father 4.componentDidMount')
  }

  shouldComponentUpdate() {
    console.log('father 5.shouldComponentUpdate')
    return true;
  }

  componentWillUpdate() {
    console.log('father 6.componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('father 7.componentDidUpdate')
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    })
  }

  render() {
    console.log('faher 3.render')
    return (
      <div>
        {this.state.number}
        <button onClick={this.handleClick}>+1</button>
        <ChildComponent number={this.state.number}></ChildComponent>
      </div>
    )
   
  }
}

class ChildComponent extends React.Component {

  componentWillMount() {
    console.log('child 2.componentWillMount')
  }

  componentDidMount() {
    console.log('child 4.componentDidMount')
  }
  componentWillReceiveProps(nextProps) {
    console.log('child 5.componentWillReceiveProps', nextProps)
  }

  shouldComponentUpdate() {
    console.log('child 6.shouldComponentUpdate')
    return true;
  }

  componentWillUpdate() {
    console.log('child 7.componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('child 8.componentDidUpdate')
  }

  render() {
    console.log('child 3.render')
    return(
      <div>{this.props.number}</div>
    )
  }
}

// 类组件
const jsx = <FaterComponent></FaterComponent>

console.log('jsx', jsx)
ReactDom.render(jsx, document.getElementById('root'))

