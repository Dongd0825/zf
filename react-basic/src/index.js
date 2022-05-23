import React from './react';
import ReactDom from './react-dom';


// 用className 是class是关键字，并且操作dom的时候，也要dom.className = 'newClass'
// babel 转义jsx React.createElement(react_element, {style: {},}, 23, '<span>')
// const jsx = <h1 style={{color: 'red'}}>23<span>ssss</span></h1>

function FunctionComponent(props) {
  return (
    <h1 style={{color: 'red'}}>{props.msg}<span>ssss</span></h1>
  )
}

// 函数组件
// babel转化 createElement('functionComponent', {msg: 'msg'})
// const jsx = <FunctionComponent msg={'msg'}></FunctionComponent>

class ClassComponent extends React.Component {
  // TODO this.props.msg
  render() {
    return(
      <h1 style={{color: 'red'}}><span>{this.props.msg}</span></h1>
    )
  }
}


// 类组件
const jsx = <ClassComponent></ClassComponent>

console.log('jsx', jsx)
ReactDom.render(jsx, document.getElementById('root'))

