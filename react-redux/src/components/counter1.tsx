import React from "react";
import { connect } from "../../react-redux";
import { ADD1, MINUS1 } from "../action-types";
import actions from "../store/actions/couter1";
import store from '../store/index.js';

class Counter extends React.Component {
  unsubscribe: any;
  // number: number = 0;
  constructor(props: any) {
    super(props);
    console.log('this.props',this.props)
    // this.state= props.state;
    // this.state = store.getState().counter1;
  }

  componentDidMount() {
    // 使用react-redux connect方法 不需要再订阅store变化
    // this.unsubscribe = store.subscribe(() => {
    //   this.setState(store.getState().counter1)
    // })
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  render(): React.ReactNode {
    return (
      <>
        {this.props.state.number}
        <button onClick={() => this.props.add1()}>+</button>
        <button onClick={() => store.dispatch({type: MINUS1})}>-</button>
      </>
    )
  }
}

export default connect((state: {counter1:any,counter2:any}) => {
  return {
    state: state.counter1
  }
}, actions)(Counter);