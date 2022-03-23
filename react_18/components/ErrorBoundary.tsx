import React from 'react';

interface IProps {
  fallback: React.ReactNode;
}

export default class extends React.Component<IProps> {
  state = {hasError: false, error: null}

  //从错误中映射状态对象
  static getDerivedStateFromError(error: any) {
    console.log('hasError',error);
    return {
      hasError: true,
      error
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}