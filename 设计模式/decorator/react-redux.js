import React from 'react';

const mapStateToProps  = (state) => state;
const mapDispatchToProps = (dispatch) => {};

function connect(mapStateToProps, mapDispatchToProp) {
 return function (Target) {
   return class  extends React.Component {
     render() {
       <Target></Target>
     }
   }
 }
}

@connect(mapStateToProps, mapDispatchToProps)
class App1 extends React.Component {
  render() {
    return <div></div>
  }
}

ReactDom.render(<App1/>, document.getElementById('root'))