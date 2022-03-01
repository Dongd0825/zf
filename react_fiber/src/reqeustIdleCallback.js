 //=============实现requestIdleCallback==利用messageChannel 和 requestAnimationFrame====
 let frameDeadline;
 let penddingCallback;
 let channel = new MessageChannel();

 channel.port1.onmessage = function() {
   // 判断当前帧是否结束
   // timeRemaining()计算的是当前帧的剩余时间 如果大于0 说明当前帧还有剩余时间
   let timeRemain = timeRemaining();
   if (timeRemain) {
     penddingCallback && penddingCallback({
       // 当前帧是否完成
       didTimeout: timeRema < 0,
       // 传入计算当前帧还剩多少时间的方法
       timeRemaining
     })
   }
 }

 // 当前帧还剩多少时间
 function timeRemaining() {
   // 当前帧结束时间 - 当前时间
   // 如果结果 > 0 说明当前帧还有剩余时间
   return frameDeadline - performance.now();
 }
 
 function requestIdleCallback_InReact(callback) {
   //requestAnimationFrame的回调被执行的时机是当前帧开始绘制之前
   requestAnimationFrame(rafTime => {// rafTime是当前帧开始时候的时间
     // 算出当前帧的结束时间 这里就先按照16.66ms一帧来计算
     frameDeadline = rafTime + 16.66;
     // 存储回调
     penddingCallback = callback;
     // 这里发送消息，MessageChannel是一个宏任务，也就是说上面onmessage方法会在当前帧执行完成后才执行
     // 这样就可以计算出当前帧的剩余时间了
     channel.port1.postMessage('haha') 
   })
 }
// 根据requestAnimationFrame得出当前帧开始的时间，然后计算出当前帧的结束时间，frameDeadline = rafTime + 16.66。
// 根据MessageChannel宏任务的特性，就可以算出当前帧执行了多少时间，当前帧执行了多少时间 = frameDeadline - performance.now()。
// =============