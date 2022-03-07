import React from 'react';
import ReactDom from 'react-dom';
class Counter extends React.PureComponent {
  state =  {number: 0}
  /**
   * 同步模式下（React17之前，稳定版，包括cra），
   * setState更新是同步的
   * 1. 回调函数，是更新之后才会执行，可以拿到最新状态
   * 2. 回调函数批量执行（提高效率）
   * 3. setState 传入函数, 表示后一个状态依赖前一个状态
   * 4. 如果想在setTimeout实现异步更新，需要用unstable_batchedUpdates包裹
   *    但是在异步并发模式下（react17），setTimeout里天然就是异步
   * @param {*} event 
   */
  handleClick = (event) => {
    // this.setState({number:this.state.number+1}, () => {
    //   console.log('setState1', this.state);
    // });
    // this.setState({number:this.state.number+1}, () => {
    //   console.log('setState2', this.state);
    // });
    // 函数
    // this.setState((prevState) => {
    //   return {
    //     number: prevState.number +1
    //   }
    // })

    // 0 0 2 2
    // this.setState((prevState) => ({
    //   number: prevState.number + 1
    // }), () => {
    //   console.log('setState1 callback', this.state); // 2
    // })
    // console.log('setState1', this.state); // 0
    // this.setState((prevState) => ({
    //   number: prevState.number + 1
    // }), () => {
    //   console.log('setState2 callback', this.state); // 2
    // })
    // console.log('setState2', this.state); // 0
    debugger;
    this.setState((prevState) => ({number: prevState.number + 1}));
    console.log('setState1', this.state);
    this.setState((prevState) => ({number: prevState.number + 1}));
    console.log('setState2', this.state);
    setTimeout(() => {
      // 在setTimeout里面，setInterval里面，或原生事件回调等回调里，更新是同步的
      // this.setState((prevState) => ({number: prevState.number + 1}));
      // console.log('setState3', this.state);
      // this.setState((prevState) => ({number: prevState.number + 1}));
      // console.log('setState4', this.state);
      // 0 0 3 4

      // 想回调也是异步，使用unsta_batchUpdates
      ReactDom.unstable_batchedUpdates(() => {
        this.setState((prevState) => ({number: prevState.number + 1}));
        console.log('setState3', this.state);
        this.setState((prevState) => ({number: prevState.number + 1}));
        console.log('setState4', this.state);
        // 0 0 2 2
      });
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

export default Counter;