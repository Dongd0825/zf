(function (ready) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    ready();
  } else {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        ready();
      }
    }
  }
})(
  function perf () {
    const data = {
      FP: 0, // First-Paint
      FCP: 0, // First-Content-Paint
      LCP: 0, // Largest-Content-Paint
      L: 0, // onload Event
      DCL: 0, // Dom Content Loaded
      FID: 0, // First Input Delay
      CLS: 0 // Cumulative Layout Shift 布局总偏移
    }
    console.log(data, 'index')
    //直接往PerformanceObserver()入参匿名回调函数，成功new了一个PerformanceObserver类的，名为observer的对象
    try {
      var observer1 = new PerformanceObserver(function(list, obj) {
        var entries = list.getEntries();
        console.log({entries})
        for (var i = 0; i < entries.length; i++) {
          const entry = entries[i];
          if (entry.name="first-paint") {
            data.FP = entry.startTime;
          }
          if (entry.name="first-content-paint") {
            data.FCP = entry.startTime;
          }
        }
        console.log({data})
      });
      //调用observer对象的observe()方法
      observer1.observe({ type: 'paint' });
    } catch(err) {
      console.log(err)
    }
  
    try {
      var observer2 = new PerformanceObserver(function(list, obj) {
        var entries = list.getEntries();
        for (var i = 0; i < entries.length; i++) {
          const entry = entries[i];
          if (entry.name="first-input") {
            data.FID = entry.processingStart - entry.startTime;
          }
          console.log('FID', {data})
        }
      });
      //调用observer对象的observe()方法
      observer2.observe({ type: "first-input" });
    } catch(err) {
      console.log(err)
    }
  
    // try {
    //   var observer = new PerformanceObserver(function(list, obj) {
    //     var entries = list.getEntries();
    //     for (var i = 0; i < entries.length; i++) {
    //       const entry = entries[i];
    //       if (entry.name="layout-shift") {
    //         data.CLS += entry.value;
    //       }
    //       console.log({data})
    //     }
    //   });
    //   //调用observer对象的observe()方法
    //   observer.observe({ type: "layout-shift" });
    // } catch(err) {
    //   console.log(err)
    // }
  }
);