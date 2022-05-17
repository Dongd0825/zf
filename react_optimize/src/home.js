import React from 'react';
import { PureComponent, memo } from './utils';
import  { Map } from 'immutable';

class ClassTitle extends PureComponent  {
  constructor() {
    super();
  }
  render() {
    console.log('class title render')
    return (
      <div>{this.props.title}</div>
    )
  }
}

function FuncTitle(props) {
  console.log('functitle render')
  return <>
    {props.title}
  </>
}

const MemoFunctionTitile = memo(FuncTitle);

class Counter extends PureComponent {
  constructor() {
    super();
  }
  render() {
    console.log('counter title render')
    return (
      <div>{this.props.num}</div>
    )
  }
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      num: Map({num: 0}),
      titile: ''
    }
  }

  add(gap) {
    let num = this.state.num.set('num', this.state.num.get('num')+gap)
    this.setState({
      num
    })
  }
  render() {
    console.log('app render')
    return(
      <>
        <button onClick={() =>this.add(1)}>+1</button>
        <button onClick={() => this.add(0)}>+0</button>
        <Counter num={this.state.num.get('num')}></Counter>
        <ClassTitle num={this.state.title}></ClassTitle>
        {/* <FuncTitle num={this.state.title}></FuncTitle> */}
        <MemoFunctionTitile  num={this.state.title}></MemoFunctionTitile>
      </>
    )
  }
}

export default Home;