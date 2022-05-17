// 固定列表
import createListComponent from './createListComponent';

const FixedSizeList = createListComponent({
  getItemOffset: ({itemSize}, index) => {
    return itemSize * index;
  },
  getItemSize: ({itemSize}, index) => {
    return itemSize;
  },
  getEstimatedTotalSize: ({itemSize, itemCount}) => {
    return itemSize * itemCount;
  },
  getStartIndexForOffset: ({itemSize}, scrollOffset) => {
    return Math.floor(scrollOffset / itemSize);
  },
  getStopIndexForStartIndex: ({itemSize, height}, startIndex, scrollOffset) => {
    const  numVisibleItems =  Math.ceil(height / itemSize)
    return startIndex + numVisibleItems - 1; // 闭区间
  },
  getOffsetForIndex: (props, index) => {
    const { itemSize } = props;
    return itemSize * index
  }
})

export default FixedSizeList;