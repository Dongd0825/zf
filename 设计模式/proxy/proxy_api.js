let MissWU = {
  name: 'wu',
  age: 24,
}

const MissWuMaMa = new Proxy(MissWU, {
  get(target, key) {
    if (key === 'age') {
      return target.age - 5;
    }
    // @ts-ignore
    return target[key];
  },
  set(target, key, value) {
    if (key === 'BF') {
      if (value.age > 30) {
        throw new Error();
      } else {
        target[key] = value;
      }
    } 
  }
})

const missWuMaMa = new MissWuMaMa();
console.log(missWuMaMa.age);
missWuMaMa.BF = {
  age: 33
}
