import React from 'react';
import io from 'socket.io-client';

function useClimateEvents(initialState) {
  const prevMessageRef = React.useRef();
  const [currentMessage, setCurrentMessage] = React.useState();
  const [events, setEvents] = React.useState([]);
  const [zones, updateZones] = React.useState(initialState);

  React.useEffect(() => {
    if (prevMessageRef.current !== currentMessage) {
      setEvents([...events, currentMessage]);
      prevMessageRef.current = currentMessage;
    }
  }, [prevMessageRef, events, currentMessage]);

  React.useEffect(() => {
    const socket = io('http://localhost:8000');

    fetch('/events').then(b => b.json()).then(setEvents);

    socket.on('change', (msg) => {
      console.debug('message: ', JSON.stringify(msg));
      updateZones({...zones, [msg.key]: msg.value });
      setCurrentMessage(msg);
    });
  }, []);

  return [events, zones];
}

export default useClimateEvents;
