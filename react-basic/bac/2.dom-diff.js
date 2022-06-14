import React from '../src/react';
import ReactDom from '../src/react-dom';

class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['A', 'B', 'C', 'D', 'E', 'F']
    }
  }

  handleClick = () => {
     this.setState({
      list: ['A','C','E','B','G']
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map(_=><li key={_}>{_}</li>)}
        </ul>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
// 类组件
const jsx = <Foo></Foo>

console.log('jsx', jsx)
ReactDom.render(jsx, document.getElementById('root'))

