import React from 'react';
import io from 'socket.io-client';

function useClimateEvents(floorPlanName) {
  const prevMessageRef = React.useRef();
  const [currentMessage, setCurrentMessage] = React.useState();
  const [events, setEvents] = React.useState([]);
  const [zones, updateZones] = React.useState({});

  React.useEffect(() => {
    if (prevMessageRef.current !== currentMessage) {
      setEvents([...events, {
          roomName: currentMessage.key,
          temperature: currentMessage.value,
          floorPlanName,
          createdAt: currentMessage.createdAt
        }
      ]);
      prevMessageRef.current = currentMessage;

      updateZones({...zones, [currentMessage.key]: currentMessage.value });
    }
  }, [zones, prevMessageRef, events, currentMessage]);

  React.useEffect(() => {
    const socket = io('/');
    fetch(`/events/floorplan/${floorPlanName}/last`)
      .then(b => b.json())
      .then(latestEvents => {
        const initialState = latestEvents.reduce((acc, next) => ({
          ...acc,
          [next.roomName]: next.temperature
        }), {});
        updateZones(initialState)
      });

    fetch(`/events/floorplan/${floorPlanName}/all`)
      .then(b => b.json())
      .then(setEvents);


    socket.on('change', (msg) => {
      console.debug('message: ', JSON.stringify(msg));
      setCurrentMessage(msg);
    });
  }, []);

  return [events, zones];
}

export default useClimateEvents;
