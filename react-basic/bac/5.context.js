import React from '../src/react';
import ReactDom from '../src/react-dom';
let ThemeContext = React.createContext();
console.log(ThemeContext);
const { Provider, Consumer } = ThemeContext;

class Title extends React.Component{
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Consumer>
        {
          (contextType) => (
            <div>
              <div style={{color: contextType.color}}> 
                title
              </div>
            </div>
          )
        }
      </Consumer>
    )
  }
}

class Content extends React.Component{
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Consumer>
        {
          (contextType) => (
            <div>
              <div style={{color: contextType.color}}> 
                content
              </div>
            </div>
          )
        }
      </Consumer>
    )
  }
}

class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    }
  }

  changeColor = () =>{
    this.setState({color:'green'})
  }

  render() {
    let contextValue = { color: this.state.color, changeColor: this.changeColor };
    return (
      <Provider value={contextValue}>
        <div>
          <Title color={this.state.color}></Title>
          <Content color={this.state.color}></Content>
          <button onClick={() => contextValue.changeColor()}>changeColor</button>
        </div>
      </Provider>
    )
  }
  
}
// 类组件
const jsx = <Foo></Foo>

console.log('jsx', jsx)
ReactDom.render(jsx, document.getElementById('root'))

