import React from 'react';
import AptE, { zones as aptEZones } from './floorplans/AptE';
import useClimateEvents from './hooks/useClimateEvents';
import Layout from './Layout';
import Timeline from './Timeline';

const titles = ['floor plan', 'timeline'];

const initialState = Object
      .values(aptEZones)
      .reduce((acc, next) => ({ ...acc, [next]: 0 }), {});

function App() {
  const [events, zones] = useClimateEvents(initialState);
  return (
    <Layout
      titles={titles}
    >
      <AptE
        kitchen={zones[aptEZones.kitchen]}
        bedroom={zones[aptEZones.bedroom]}
        bathroom={zones[aptEZones.bathroom]}
        livingroom={zones[aptEZones.livingroom]}
      />
      <Timeline events={events} />
    </Layout>
  );
}

export default App;
