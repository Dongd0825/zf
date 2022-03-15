
/**
 * 
 * @param {*} current  上一个fiber 初次null
 * @param {*} workInProgress 新fiber
 */
function beginWork(current, workInProgress) {
  switch(workInProgress.tag) {
    case IndeterminateComponent: 
      return mountIndeterminateComponent(
        current,
        workInProgress,
        workInProgress.type
      );
    default:
      break;
  }
}

function mountIndeterminateComponent(current, workInProgress,Component) {
  value = renderWithHooks(
    current, 
    workInProgress,
    Component
  )
}