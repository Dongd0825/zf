import React from "react";
import { connect } from "../../react-redux";
import { ADD2, MINUS2 } from "../action-types";
import store from '../store/index.js';

class Counter extends React.Component {
  unsubscribe: any;
  // number: number = 0;
  constructor(props: any) {
    super(props);
    // this.state = store.getState().counter2;
    // this.state = props.state;
  }

  componentDidMount() {
    // 使用react-redux connect方法 不需要再订阅store变化 
    // 当props的state变更，会直接触法组件rerender
    // this.unsubscribe = store.subscribe(() => {
    //   this.setState(store.getState().counter2)
    // })
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  render(): React.ReactNode {
    return (
      <>
        {this.props.state.number}
        <button onClick={() => store.dispatch({type: ADD2})}>+</button>
        <button onClick={() => store.dispatch({type: MINUS2})}>-</button>
      </>
    )
  }
}

export default connect((state: {counter1:any,counter2:any}) => {
  return {
    state: state.counter2
  }
}, )(Counter);