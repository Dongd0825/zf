
let workInProgress = null;

function workLoop() {
  while(workInProgress !== null)  {
    workInProgress = performUnitOfWork(workInProgress);
  }
}

// 每一个fiber都是一个工作单元
function performUnitOfWork(unitOfWork) {
  let current = unitOfWork.alternate;
  beginWork(current);

}

// 正常应该根结底，创建fiber
export function render(fiber) {
  workInProgress = fiber;
  workLoop();
}