import React, { useMemo, useCallback, useState } from './react';
import ReactDOM from './react-dom';

let  Child = ({data,handleClick})=>{
  console.log('Child render');
  return (
     <button onClick={handleClick}>{data.number}</button>
  )
}
Child = React.memo(Child);

function App(){
  console.log('App render');
  const[name,setName]=useState('zhufeng');
  const[number,setNumber]=useState(0);
  let data = useMemo(()=>({number}),[number]);
  let handleClick = useCallback(()=>{
    setNumber(number+1);
  } ,[number]);
  return (
    <div>
      <input type="text" value={name} onChange={event=>setName(event.target.value)}/>
      <Child data={data} handleClick={handleClick}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);