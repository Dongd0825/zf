/**
 * FP
 * 
 * FCP
 * LCP
 */

function perf() {
  const data = {
    FP: 0,// 首次绘制从开始请求网站，到屏幕渲染第一个像素点的时间
    FCP: 0, //首次内容绘制，可以说i文本svg或图片。不包括iframe和白色背景的canvas元素
  }
  const observer = new PerformanceObserver((entryList) => {
   var entries = entryList.getEntries();
   console.log({entries})
   entries.forEach((entry) => {
     if (entry.name == 'first-paint') {
       data.FP = entry.startTime;
       console.log('FP', entry.startTime)
     } else if(entry.name ==='first-content-paint') {
       data.FCP = entry.startTime;
       console.log('FCP', entry.startTime)
     }
   })
  }, {type: 'paint'})
}