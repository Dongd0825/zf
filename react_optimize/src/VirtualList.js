import React, {useState, useRef, useEffect} from 'react';

const VirtualList = (props) => {
  const { width, height, itemCount, itemSize, renderItem} = props;
  const scrollBox = useRef();
  const [start, setStart] = useState(0);
  
  let end = start + Math.floor(height/itemSize) + 1;
  end = end < itemCount ? end : itemCount;

  const arr = new Array(end - start + 1).fill(0).map((item, index) => {
    return {
      index: start + index,
    }
  })

  function handleScroll () {
    let scrollTop = scrollBox.current.scrollTop;
    let _start = Math.floor(scrollTop/itemSize);
    setStart(_start);
  }

  return (
    <div style={{width, height, overflow: 'auto'}} onScroll={handleScroll} ref={scrollBox}>
      <div style={{width: '100%', position:'relative'}}>
        {
          arr.map((_) => {
            return renderItem({
              index: _.index, 
              style:{
                position: 'absolute',
                width: '100%', 
                height: `${itemSize}px`, 
                top: _.index * itemSize}})
          })
        }
      </div>
    </div>
  )
}

export default VirtualList;