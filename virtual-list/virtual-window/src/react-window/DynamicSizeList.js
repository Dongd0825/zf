// 变化高度列表
import createListComponent from './createListComponent';

// 默认条目预估高度50
const DEFAULT_ESTIMATE_SIZE= 50;

function getEstimatedTotalSize({itemSize, itemCount}, instanceProps) {
  const { estimatedItemSize, lastEstimateIndex, itemMetaDataMap } = instanceProps;

  // 预估高度 = 测量过的高度 + 未测量过的高度
  let totalSizeofMeasuredSize = 0;
  if (lastEstimateIndex >= 0) {
    const itemData = itemMetaDataMap[lastEstimateIndex];
    totalSizeofMeasuredSize += itemData.offset + itemData.size;
  }
  const numUnmeasuredItems = itemCount - lastEstimateIndex - 1;
  const totalSizeofUnMeasuredSize = numUnmeasuredItems * estimatedItemSize
  return totalSizeofMeasuredSize + totalSizeofUnMeasuredSize;
}

// 找到最近的距离可视区窗口的index
// TODO 二分查找
function findNearestItemIndex(props, scrollOffset, instanceProps) {
  const { lastEstimateIndex, itemMetaDataMap } = instanceProps;
  // lastEstimateIndex 预估offset大于scrollOffest，可以用metadata获取
  const lastEstimateIndexOffset = lastEstimateIndex > -1 ? itemMetaDataMap[lastEstimateIndex].offset : 0;
  if (lastEstimateIndexOffset >= scrollOffset) {
    // 二分出现bug n=>log(n)
    return findNearestItemBinarySearch(props, scrollOffset, lastEstimateIndex, 0, instanceProps);
  } else {
    return findNearestItemExponentialSearch(props, instanceProps, Math.max(0, lastEstimateIndex), scrollOffset);
  }
}

// 二分查找,找到【low，high】区间，等于「小于」offset距离的index
function findNearestItemBinarySearch(
  props, 
  scrollOffset, 
  high, 
  low, 
  instanceProps
) {
  while(low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    const middleItem = getItemMetaData(props, middle, instanceProps);
    
    if (middleItem.offset === scrollOffset) {
      return middle;
    } else if (middleItem.offset > scrollOffset) {
      high = middle - 1;
    } else if (middleItem.offset < scrollOffset) {
      low = middle + 1;
    }
  }

  // 大于0 要-1
  if (low > 0) {
    return low - 1; //TODO?
  } else {
    return 0;
  }
}

// 快速的指数测量所有的条目元数据，并返回需要的startIndex
function findNearestItemExponentialSearch(
  props, 
  instanceProps,
  index,
  offset
) {
  const { itemCount } = props;
  let interval = 1;
  // 快速计算至滑动距离处
  while (
    index < itemCount && 
    getItemMetaData(props, index, instanceProps).offset < offset
  ) {
    index += interval;
    interval *= 2; // [1, 2, 4, 8, 16]
  }

  return findNearestItemBinarySearch(
    props,
    offset,
    Math.min(index, itemCount - 1),
    Math.floor(index / 2), // [16/2, 16]之间查找索引 
    instanceProps
  )
}

function getItemMetaData({itemSize}, index, instanceProps) {
  const { itemMetaDataMap, lastEstimateIndex } = instanceProps;
  if (index > lastEstimateIndex) {
    let offset = 0;
    // lastEstimateIndex > 0 证明 lastEstimateIndex之前的数据已经记录在itemMetaDataMap对象下
    if (lastEstimateIndex >= 0) {
      const itemMetaData = itemMetaDataMap[lastEstimateIndex];
      offset += itemMetaData.size + itemMetaData.offset;
    }
    // lastEstimateIndex之后的，要自己计算
    for (let i = lastEstimateIndex + 1; i <= index; i++) {
      const size = itemSize ? itemSize(i) : DEFAULT_ESTIMATE_SIZE;
      itemMetaDataMap[i] = {
        size,
        offset,
      }
      offset += size;
    }
    instanceProps.lastEstimateIndex = index;
  }
  return itemMetaDataMap[index];
}

const VariableSizeList = createListComponent({
  getItemOffset: (props, index, instanceProps) => getItemMetaData(props, index, instanceProps).offset,
  getItemSize: (props, index, instanceProps) => getItemMetaData(props, index, instanceProps).size,
  getEstimatedTotalSize,
  getStartIndexForOffset: (props, scrollOffset, instanceProps) => findNearestItemIndex(props, scrollOffset, instanceProps),
  getStopIndexForStartIndex: (props, startIndex, scrollOffset, instanceProps) => {
    const { height, itemCount } = props;
    // 可视区第一个条目的元数据
    const itemMetaData = getItemMetaData(props, startIndex, instanceProps);
    // 可视区的最大高度
    const maxOffset = itemMetaData.offset + height;
    // 可视区第一个条目距离顶部的高度
    let offset = itemMetaData.offset;
    // 计算可视区最后一个条目的index
    let stopIndex = startIndex;
    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetaData(props, stopIndex, instanceProps).size;
    }
    return stopIndex;
  },
  initInstaceProps: (props) => {
    const { estimatedItemSize } = props;
    // TODO
    return {
      // 预估的条目的高度
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATE_SIZE,
      // 条目的源数据「size, offset」条目高度和距离顶部的高度
      itemMetaDataMap: {},
      // 最后一个预估的条目index
      lastEstimateIndex: -1, // 在渲染过程中不停的真实测量每个条目的高度，测量就是实际计算每个条目真正的offset和height（offset，size）
    }
  },
})

export default VariableSizeList;