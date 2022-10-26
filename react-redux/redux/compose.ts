
export function compose(fns) {
  return function(args) {
    for(let i = fns.length - 1; i >= 0; i--) {
      args = fns[i](args);
    }
    return args;
  }
}