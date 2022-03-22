
let ReactCurrentDispather = {
  current: null
}

const HooksDispatchOnMount = {
  userReducer: mountReducer
}

export function useReducer(reducer, initalArg) {
  let dispather = ReactCurrentDispather.current.userReducer(reducer, initalArg);
  return dispather;
}

// 不同阶段 useReducer 不同实现
export function renderWithHooks(current, workInProgress, Component) {
  currentlyRenderingFiber = workInProgress;
  ReactCurrentDispather.current = HooksDispatchOnMount;
  let children = Component();
  currentlyRenderingFiber = null;
  return children;
}

function mountReducer(reducer, initalArg) {
  let hook = mountInprogressHook();
  hook.memoizedState = initalArg;
  const queue = (hook.queue = { pending: null});// 更新队列
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
  return [hook.memoizedState, dispatch];
}

function mountInprogressHook() {
  // 先创建一个hook对象
  let hook = {
    memoizedState: null, // 自己的状态
    queue: null, // 自己的更新队列
    next: null, // 下一个
  }

  //第一次的hook
  if (workInProgress === null) {
    ReactCurrentDispather.memoizedState = workInProgress = hook;
  } else {
    workInProgress.next = hook;
  }
  return workInProgress;
}
