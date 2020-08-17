import React from 'react';
import io from 'socket.io-client';
import AptE, { zones as aptEZones } from './floorplans/AptE';
import Layout from './Layout';

const titles = ['floor plan', 'timeline'];

const initialState = Object
      .values(aptEZones)
      .reduce((acc, next) => ({ ...acc, [next]: 0 }), {});

function App() {
  const [zones, updateZones] = React.useState(initialState);

  React.useEffect(() => {
    const socket = io('http://localhost:8000');
    socket.on('change', (msg) => {
      console.debug('message: ', JSON.stringify(msg));
      updateZones({...zones, [msg.key]: msg.value });
    });
  });

  return (
    <Layout
      titles={titles}
      views={[
        <div className="App">
          <AptE
            kitchen={zones[aptEZones.kitchen]}
            bedroom={zones[aptEZones.bedroom]}
            bathroom={zones[aptEZones.bathroom]}
            livingroom={zones[aptEZones.livingroom]}
          />
        </div>,
        <div>view</div>
      ]}
    />
  );
}

export default App;
