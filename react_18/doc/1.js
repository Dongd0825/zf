let state = 0;

let isBatchingUpdate = false;
let updateQueue = [];

function setState(newState) {
  if (isBatchingUpdate) {
    updateQueue.push(newState);
  } else {
    state = newState;
  }
}
// react 17 非并发模式
function handleClick() {
  isBatchingUpdate = true;
  setState(state + 1); // 0
  setState(state + 1); // 0 
  setTimeout(() => {
    setState(state + 1); // 1
    setState(state + 1); // 2
  })
  isBatchingUpdate = false;
}
handleClick();
state= updateQueue.pop();
console.log(state);
