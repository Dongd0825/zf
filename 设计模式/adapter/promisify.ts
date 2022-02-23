export {}
import fs from 'fs';
function readFileAdapter(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) reject(err);
      resolve(data)
    })
  })
}
// BluebirdPromise.promisify(fs.readFile)
function promisify(fn) {
  return function(...args) {
      return new Promise((resolve, reject) => {
        fn(...args, (err, data) => {
          err ? reject(err) : resolve(data);
        })
      })
  }
}