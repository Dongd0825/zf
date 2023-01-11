function *gen() {
  yield 1;
  yield 2;
  yield 3;
}

const it = gen();
console.log(it[Symbol.iterator])
const r1 = it.next();
console.log({r1});

// const r2 = it.throw();
// let r2 = it.return();
const r2 = it.next();
console.log({r2})

const r3 = it.next();
console.log({r3})

const r4 = it.next();
console.log({r4})


