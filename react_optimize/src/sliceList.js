import React, { useEffect, useState, useRef } from "react";

function useCallbackState(initData) {
  const ref = useRef();
  const [data, setData] = useState(initData);

  useEffect(() => {
    ref.current && ref.current(data);
  }, [data])

  return [data, function(_data, callback) {
    ref.current = callback;
    setData(_data);
  }]
}

function sliceList () {
  const [list, setList] = useCallbackState([]);

  function handleClick() {
    timeSlice(500);
  }

  function timeSlice(times, list = []) {
    // requestIdleCallback 空闲
    // setTimeout 不及时
    requestAnimationFrame(() => { // 每次渲染前
      times -= 100;
      // TODO回调
      setList([...list, ...new Array(10).fill(0)], function(list) {
        if (times) {
          timeSlice(times, list);
        }
      });
    })
  }

  return (
    <ul>
      <button onClick={() => handleClick()}>加载</button>
      <input></input>
      <ul>
        {
          list?.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </ul>
  )
}

export default sliceList;