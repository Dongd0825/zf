import React, { Suspense } from 'react';

function fetchUser(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({success: true, data: {id: 1, name: 'zhangsan'}});
    }, 1000 & id)
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
let userResource2 = createResource(fetchUser(2));
let userResource3 = createResource(fetchUser(3));

const resourceMap:any = {
  1: userResource,
  2: userResource2,
  3: userResource3
}

interface UserProps {
  id: number;
}

function User(props: UserProps) {
  const result = resourceMap[props.id].read();
  if (result.success) {
    let data = result.data;
    return (
      <div>
        {data.id} - {data.name}
      </div>
    ) 
  } else {
    return null;
  }
}

 class A extends React.Component {
  render() {
    return (
      // @ts-ignore
      <React.SuspenseList revealOrder="together">
        <Suspense fallback={<h1>loading</h1>}>
          <User id={1}/>
        </Suspense>
        <Suspense fallback={<h1>loading</h1>}>
           <User id={2}/>
        </Suspense>
        <Suspense fallback={<h1>loading</h1>}>
          <User id={3}/>
        </Suspense>
      </React.SuspenseList>
    )
  }
}

export default A;