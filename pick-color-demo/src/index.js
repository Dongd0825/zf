import React, {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import ColorPipette from './color-pipette.ts';

function PickColor(props) {
  const [pipette, setPipette] = useState();
  const [color, setColor] = useState('#fff');

  // 初始化
  useEffect(() => {
    const pipette = new ColorPipette({
      container: props.container,
      scale: 2,
      listener: {
        onOk: ({ color, colors }) => {
          setColor(color);
          props.onChange(color);
        },
      }
    });
    setPipette(pipette);
  }, []);

  return (
    <>
      <div 
        onClick={() => pipette.start()}
        style={{width: '30px', height: '30px', backgroundColor: color}}
      >{color}</div>
    </>
  )
}

function App() {
  const soureRef = useRef();
  function handleChange(color) {
    console.log('color', color);
  }

  return (
    <div>
      <div id="source" refs={soureRef}>
        <img 
          style={{width: '300px', height:'300px'}}
          src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a7fb653ad754acf9a712cef4de7217a~tplv-k3u1fbpfcp-watermark.image?"></img>
      </div>
      <PickColor 
        container={soureRef.current}
        onChange={handleChange}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);



