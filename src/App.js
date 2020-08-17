import React from 'react';
import './App.css';
import io from 'socket.io-client';
import AptE, { zones as aptEZones } from './floorplans/AptE';

const initialState = Object
      .values(aptEZones)
      .reduce((acc, next) => ({ ...acc, [next]: 0 }), {});

function App() {
  const [zones, updateZones] = React.useState(initialState);

  React.useEffect(() => {
    const socket = io('http://localhost:8000');
    socket.on('change', (msg) => {
      console.log('message: ' + msg);
      updateZones({...zones, [msg.key]: msg.value });
    });
  });

  return (
    <div className="App">
      <AptE
        kitchen={zones[aptEZones.kitchen]}
        bedroom={zones[aptEZones.bedroom]}
        bathroom={zones[aptEZones.bathroom]}
        livingroom={zones[aptEZones.livingroom]}
      />
    </div>
  );
}

export default App;
