function runSaga(saga) {
  //执行生成器，得到迭代器
  const it = saga();

  function next() {
    const { value: effect, done } = it.next();
    console.log('effect', effect, done)
    if (!done) {
      if (effect.type === 'PUT') {
        console.log(`向仓库派发一个动作${JSON.stringify(effect.action)}`);
        next();
      } else if (effect instanceof Promise) {
        effect.then(next);
      } else {
        next();
      }
    }
  }

  next()
}

function * rootSaga() {
  yield { type: 'PUT', action: { type: "MINUS" } };
  yield new Promise((resolve) => setTimeout(() => {
    console.log(123)
    resolve()
  }, 1000))
}

runSaga(rootSaga);