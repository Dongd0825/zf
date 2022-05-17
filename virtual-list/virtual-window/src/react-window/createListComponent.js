import React from 'react';
import { clearRequestTimeout, requestTimeout } from './timer';

const IS_SCROLLING_DEBOUNCE_INTERVAL = 120;

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.domRef = React.createRef();
    this.resizeObserver = null;
  }

  componentDidMount() {
    if (this.domRef.current) {
      const node = this.domRef.current.firstChild;
      const { onSizeChange, index } = this.props;
      this.resizeObserver = new ResizeObserver(() => {
        onSizeChange(index, node);
      })
      this.resizeObserver.observe(node)
    }
  }

  componentWillUnmount() {
    if (this.resizeObserver && this.domRef.current.firstChild) {
      this.resizeObserver.unobserve(this.domRef.current.firstChild)
    }
  }
  
  render() {
    const { ComponentType, index, style, isScrolling } = this.props;
    console.log('aaa',isScrolling)
    return <div ref={this.domRef} style={style}>
      <ComponentType index={index} isScrolling={isScrolling}/>
    </div>
  }
}

const createListComponent = ({
  getItemOffset, // 获取每一行的相对于总列表顶部的距离
  getItemSize, // 获取每一行的高度
  getStartIndexForOffset, // 根据卷起的高度计算开始索引
  getEstimatedTotalSize, // 获取虚拟列表的总高度
  getStopIndexForStartIndex, // 根据startIndex 获取stopIndex
  initInstaceProps, // 初始化实例属性的方法
  getOffsetForIndex,// 获取条目的距离顶部的距离
}) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startIndex: 0,
        list: [],
        scrollOffset: 0,
        isScrolling: false,
      }
      this.cacheStyle = new Map()
      this.outerRef = React.createRef();
      this.firstRef = React.createRef();
      this.lastRef = React.createRef();
      this.oldFirstRef = React.createRef();
      this.oldLastRef = React.createRef();
      this.instanceProps = initInstaceProps && initInstaceProps(this.props);
      this._resetIsScrollingTimeoutId = null;
    }
    // es6 新写法， 等同于在construtor赋值
    // instanceProps = initInstaceProps && initInstaceProps()
    // es6 新写法， 等同于在construc赋值
    // state = {
    //   startIndex: 0,
    //   list: [],
    //   domRef: null,
    //   scrollOffset: 0,
    // }

    // 用babel会做转换，props的初始值
    static defaultProps = {
      overScanCount: 2, // 过扫描的数量，多渲染几条。页面不会卡顿
      useIsScrolling: false,
    }

    componentDidMount() {
      this.observe(this.oldFirstRef.current = this.firstRef.current);
      this.observe(this.oldLastRef.current = this.lastRef.current);
    }

    componentDidUpdate() {
      if (this.oldFirstRef.current !== this.firstRef.current) {
        this.oldFirstRef.current = this.firstRef.current;
        this.observe(this.firstRef.current);
      }
      if (this.oldLastRef.current !== this.lastRef.current) {
        this.oldLastRef.current = this.lastRef.current;
        this.observe(this.lastRef.current);
      }
    }
    
    componentWillUnmount() {
      if (this._resetIsScrollingTimeoutId) {
        clearRequestTimeout(this._resetIsScrollingTimeoutId);
      }
    }

    scrollToItem(index) {
      this._scrollToOffset(getOffsetForIndex(this.props, index));
    }

    _scrollToOffset(offset) {
      this.setState({
        scrollOffset: offset
      })
      this.outerRef.current.scrollTop = offset
    }
    
    observe(dom) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(this.onScroll);
      }, {
        root: this.outerRef.current
      })
      io.observe(dom)
    }

    _getItemStyle(index) {
      if (this.cacheStyle.has(index)) {
        return this.cacheStyle.get(index);
      }
      const rowStyle = {
        position: 'absolute', 
        top: getItemOffset(this.props, index, this.instanceProps) + 'px',
        width: '100%',
        height: getItemSize(this.props, index, this.instanceProps) + 'px',
      };
      this.cacheStyle.set(index,rowStyle);
      return rowStyle;
    }

    onScroll = (e) => {
      const { scrollTop } = this.outerRef.current;
      this.setState({ scrollOffset: scrollTop, isScrolling: true }, this._resetIsScrollingDebounced);
    }

    _resetIsScrollingDebounced = () => {
      if (this._resetIsScrollingTimeoutId) {
        clearRequestTimeout(this._resetIsScrollingTimeoutId);
      }
      this._resetIsScrollingTimeoutId = requestTimeout(
        this._resetIsScrolling,
        IS_SCROLLING_DEBOUNCE_INTERVAL
      );
    }

    _resetIsScrolling =  () => {
      this._resetIsScrollingTimeoutId = null;
      this.setState({ isScrolling: false });
    }

    _getRangeToRender() {
      const { itemCount, overScanCount } = this.props;
      const { scrollOffset } = this.state;

      if (itemCount === 0) {
        return [0, 0]
      }
      if (itemCount > 0) {
        const startIndex = getStartIndexForOffset(this.props, scrollOffset, this.instanceProps);
        const stopIndex = getStopIndexForStartIndex(this.props, startIndex, scrollOffset, this.instanceProps);

        return [
          Math.max(0, startIndex - overScanCount),
          Math.min(itemCount - 1, stopIndex + overScanCount),
          startIndex,
          stopIndex,
        ]
      }
    }

    // 更新元数据的高度和所有数据的offset
    onSizeChange = (index, node) => {
      const height = node.offsetHeight;
      const { itemMetaDataMap, lastEstimateIndex } = this.instanceProps;
      itemMetaDataMap[index].size = height;
      let offset = 0;
      for (let i = 0; i <= lastEstimateIndex; i++) {
        const itemData = itemMetaDataMap[i];
        itemData.offset = offset;
        offset = offset + itemData.size;
      }
      this.cacheStyle.clear();
      this.forceUpdate();
    }
    
    render() {
      const { width, height, itemCount, children: Row, isDynamic, useIsScrolling } = this.props;
      const containerStyle = { position: 'relative', height, width, overflow: 'auto', willChange: 'transform'};
      const contentStyle = {
        width: '100%',
        height: getEstimatedTotalSize(this.props, this.instanceProps) + 'px'
      };
      const { isScrolling } = this.state;

      let items = [];
      if (itemCount > 0) {
        const [startIndex, stopIndex, originStartIndex, originStopIndex] = this._getRangeToRender();
        for (let index = startIndex; index < stopIndex; index++) {
          const style = this._getItemStyle(index);
          if (isDynamic) {
            if (index === originStartIndex) {
              items.push(
                <span key={'span' + index} style={{...style, width: 0, height: 0}} ref={this.firstRef}></span>
              )
              items.push(
                <ListItem key={index} style={style} onSizeChange={this.onSizeChange} index={index} ComponentType={Row} isScrolling={useIsScrolling && isScrolling}></ListItem>
              )
            } else if (index === originStopIndex) {
              items.push(
                <span key={'span' + index} style={{...style, width: 0, height: 0}} ref={this.lastRef}></span>
              )
              items.push(
                <ListItem key={index} style={style} onSizeChange={this.onSizeChange} index={index} ComponentType={Row} isScrolling={useIsScrolling && isScrolling}></ListItem>
              )
            } else {
              items.push(
                <ListItem key={index} style={style} onSizeChange={this.onSizeChange} index={index} ComponentType={Row} isScrolling={useIsScrolling && isScrolling}></ListItem>
              )
            }
          } else {
            if (index === originStartIndex) {
              items.push(
                <>
                  <span style={{...style, width: 0, height: 0}} ref={this.firstRef}></span>
                  <Row key={index} index={index} style={style}  isScrolling={useIsScrolling && isScrolling}></Row>
                </>
              )
            } else if (index === originStopIndex) {
              items.push(
                <>
                  <span style={{...style, width: 0, height: 0}} ref={this.lastRef}></span>
                  <Row key={index} index={index} style={style}  isScrolling={useIsScrolling && isScrolling}></Row>
                </>
              )
            } else {
              items.push(
                <Row key={index} index={index} style={style}  isScrolling={useIsScrolling && isScrolling}></Row>
              )
            }
          }
        }
      }

      return (
        <div style={containerStyle} ref={this.outerRef} onScroll={this.onScroll.bind(this)}>
          <div style={contentStyle}>
            {items}
          </div>
        </div>
      )
    }
  }
}

export default createListComponent;