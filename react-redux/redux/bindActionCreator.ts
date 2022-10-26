/**
 * 
 * @param actionCreator 
 * +function add() {
+    return { type: 'ADD' };
 * +}
 * @param dispatch 
 * @returns 
 */
export function bindActionCreator(actionCreator: any, dispatch: any) {
  return function (...args: any) {
    dispatch(actionCreator.apply(null, args));
  }
}