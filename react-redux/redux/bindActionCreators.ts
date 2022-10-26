import { bindActionCreator } from "./bindActionCreator"

/**
 * +function add() {
+    return { type: 'ADD' };
+}
+function minus() {
+    return { type: 'MINUS' };
+}
+const actions = { add, minus };
 * @param actionCreators  actions
 * @param dispatch 
 * @returns 
 */
export function bindActionCreators(actionCreators: Record<string, any>, dispatch: any) {
  const boundActionCreators: any = {}
  for (const key in actionCreators) {
      const actionCreator = actionCreators[key]
      if (typeof actionCreator === 'function') {
          boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
      }
  }
  return boundActionCreators
}