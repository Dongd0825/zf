export function clearRequestTimeout(obj) {
  cancelAnimationFrame(obj?.id);
}

export function requestTimeout (callback, delayTime) {
  const start = Date.now();

  const tick = () => {
    if (Date.now() - start >= delayTime) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }

  const timeoutID = {
    id: requestAnimationFrame(tick)
  };

  return timeoutID;
}