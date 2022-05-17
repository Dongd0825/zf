import React from 'react';
// import VirtualList from 'react-tiny-virtual-list';
import VirtualList from './VirtualList.js';
let data = new Array(30).fill(0);

function VirtualListDemo () {
  return (
    <VirtualList
      width="50%"
      height={500}
      itemCount={data.length}
      itemSize={50}
      renderItem={(data) => {
        let { index, style } = data;
        return (
          <div key={index} style={{...style, backgroundColor: index % 2 ? 'green' : 'yellow'}}>
            {index + 1}
          </div>
        )
      }}
    >

    </VirtualList>
  )
}

export default VirtualListDemo;