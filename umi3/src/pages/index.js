import React, { useRef, useEffect, useCallback  } from 'react';


/**
 * 防抖 最后一次触发 才会执行
 * @param {} fn 
 * @param {*} delayTime 
 * @returns 
 */
function useDebounce(fn, delayTime = 1000, dep = []) {
  const { current } = useRef({ fn, timer: null });

  useEffect(() => {
    current.fn = fn;
  }, [])

  return useCallback(function (...args) {
    if (current.timer) {
      clearTimeout(current.timer);
      current.timer = null;
    }
    current.timer = setTimeout(() => {
      current.fn.apply(null, args);
      clearTimeout(current.timer);
      current.timer = null;
    }, delayTime)
  }, dep)
}

/**
 * 节流
 * @param {*} fn 
 * @param {*} delayTime 
 * @returns 
 */
function useThrottle(fn, delayTime = 900, dep = []) {
  const { current } = useRef({ fn, timer: null });

  useEffect(() => {
    current.fn = fn;
  }, [])

  return useCallback(function(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        clearTimeout(current.timer);
        current.timer = null;
      }, delayTime);
      current.fn.apply(null, args);
    }
  }, dep)
}

const Index = () => {
  const handleScroll = (e) => {
    console.log('scroll',  e.target.scrollTop);
  }
  
  const debounceScroll = useThrottle(handleScroll);

  return <div onScroll={debounceScroll} style={{overflow:'auto', height:'300px'}}>
    <div style={{height:'3000px'}}>首页1</div>
  </div>
}

export default Index;