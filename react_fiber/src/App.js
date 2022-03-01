import './App.css';
import { useState } from 'react';

function App() {
  const [arr, setArr] = useState(new Array(10000).fill(0));

  function onAdd() {
    setArr([...arr, 1]);
  }
  return (
    <div className="App">
      <input></input>
      <button onClick={onAdd}>add</button>
     {
      arr.map((_, index) => {
        return <li key={index}>{_}</li>
      })
     }
    </div>
  );
}

export default App;
