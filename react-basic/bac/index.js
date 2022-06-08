import React from './react';
import ReactDom from './react-dom';


// 用className 是class是关键字，并且操作dom的时候，也要dom.className = 'newClass'
// babel 转义jsx React.createElement(react_element, {style: {},}, 23, '<span>')
// const jsx = <h1 style={{color: 'red'}}>23<span>ssss</span></h1>

// function FunctionComponent(props) {
//   return (
//     <h1 style={{color: 'red'}}>{props.msg}<span>ssss</span></h1>
//   )
// }

const FunctionComponent= React.forwardRef(UserName)

function UserName(props, ref) {
  return (
    <input ref={ref}></input>
  )
}

// 函数组件
// babel转化 createElement('functionComponent', {msg: 'msg'})
// const jsx = <FunctionComponent msg={'msg'}></FunctionComponent>

class ClassComponent extends React.Component {
  state = {
    number: 0,
  }
  domRef = React.createRef()
  childRef = React.createRef()
  ref = React.createRef()
  handleClick = (e) => {
    console.log("handleClick")
    this.childRef.current.focus();
    // e.stopPropagation(); 合成事件上react自己实现的方法，可以阻塞冒泡

    // this.setState({number: this.state.number+1}); 
    // console.log('number', this.state.number); 0
    // this.setState({number: this.state.number+1});
    // console.log('number', this.state.number); 0
    // setTimeout(() => { // 17是非批量 18批量 通外测的执行方式一样
    //   this.setState({number: this.state.number+1});
    //   console.log('number', this.state.number); 2
    //   this.setState({number: this.state.number+1});
    //   console.log('number', this.state.number); 3
    // })
  }
  handleDivClick = () => {
    console.log('divClick')
  }
  handleClick1 = () => {
    this.ref.current.focus();
  }
  // render() {
  //   return(
  //     <h1 style={{color: 'red'}} onClick={this.handleDivClick}>
  //       <button onClick={this.handleClick} ref={this.domRef}>+1</button>
  //       <span>{this.state.number}</span>
  //       <Child ref={this.childRef}></Child>
  //     </h1>
  //   )
  // }
  render() {
    return (
      <>
        <FunctionComponent ref={this.ref}></FunctionComponent>
        <button onClick={this.handleClick1}></button>
      </>
    )
  }
}

class Child extends React.Component {
  focus() {
    console.log('focus')
  }
  render() {
    return (
      <div>child</div>
    )
  }
}


// 类组件
const jsx = <ClassComponent msg="msg"></ClassComponent>

console.log('jsx', jsx)
ReactDom.render(jsx, document.getElementById('root'))

