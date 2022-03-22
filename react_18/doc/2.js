let state = 0;

let isBatchingUpdate = false;
let updateQueue = [];


// react 18 默认都是并发模式
function setState(newState) {
  // 创建一个更新，每个更新有一个优先级
  // 优先级相同的更新会合并；
  const update = {payload: newState, prority:0};
}

function handleClick() {
  isBatchingUpdate = true;
  setState(state + 1); // 0
  setState(state + 1); // 0
  setTimeout(() => {
    setState(state + 1); // 1
    setState(state + 1); // 1
  })
  isBatchingUpdate = false;
}
handleClick();
state= updateQueue.pop();
console.log(state);
