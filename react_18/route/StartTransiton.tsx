import React, { startTransition } from 'react';


interface IProps {
  keyword: string;
}

function Suggestion(props: IProps) {
  const result = new Array(10000).fill(0).map((x: number, index: number) => props.keyword + index);
  if (props.keyword) {
    return (
      <ul>
        {result.map((x) => <li>{x}</li>)}
      </ul>
    )
  }
  return null;
}

export default class extends React.Component {
  state={keyword: '',bindHandleChange: this.handleChange.bind(this)}

  handleChange(e: any) {
    this.setState({
      keyword: e.target.value
    })
  }

  render() {
    return (
      <>
        关键词：<div>
            <input value={this.state.keyword} onChange={(e) => {
              startTransition(() => this.state.bindHandleChange(e));
            }}></input>
          </div>
        <Suggestion keyword={this.state.keyword}></Suggestion>
      </>
    )
  }
}