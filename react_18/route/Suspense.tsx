import React, {Suspense} from 'react';
// import Suspense from '../components/Suspense';
import ErrorBoundary from '../components/ErrorBoundary';



function fetchUser(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve({success: true, data: {id: 1, name: 'zhangsan'}});
      reject({success: false, error: '数据加载失败'});
    })
  })
}

// react Lazy
function createResource(promise: Promise<any>) {
  let status = 'pending';
  let result: any;
  return {
    read: () => {
      if (status === 'success' || status === 'error') {
        return result;
      } else {
        throw promise.then((data: any) => {
          result = data;
          status = 'error';
        }, (error: any) => {
          result = error;
          status = 'success';
        })
      }
    }
  }
}

let userResource = createResource(fetchUser(1));

function User() {
  const result = userResource.read();
  if (result.success) {
    let data = result.data;
    return (
      <div>
        {data.id} - {data.name}
      </div>
    ) 
  } else {
    throw result.error;
    // return <>数据加载失败</>;
  }
}

export default class extends React.Component {
  render() {
    return (
      <ErrorBoundary fallback="出错了">
        <Suspense fallback={<h1>loading</h1>}>
          <User/>
        </Suspense>
      </ErrorBoundary>
    )
  }
}