axios({
  url: '/usr?id=1',
  method: 'GET'
}).then((res) => {
  console.log(res);
})

function axios(config) {
  let adapter = getDefaultAdapter();
  return adapter;
}
// 
function getDefaultAdapter() {
  var adapter;
  if (XMLHttpRequest) { // 浏览器
    adapter = xhr();
  } else if (typeof process !== undefined && Object.prototype.toString.call(process) === '[object process]') {
    adapter = http(); // node
  }
  return adapter;
}

function xhr(config: any) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 ) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject('请求失败');
        }
      }
    }
  })
}

function http(config: any) {
  let http = require('http');
  const url = url.parse(config.url);
  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.path,
      method: config.method
    };
    let req = http.request(options, function(response) {
      let chunks = [];
      response.on('data', (data) => {
        chunks.push(data);
      })
      response.on('end', () => {
        let result = Buffer.concat(chunks).toString();
        resolve(result);
      })
    })
    req.on('error', (error) => {
      reject(error)
    })
    req.end();
  })
}

export {}