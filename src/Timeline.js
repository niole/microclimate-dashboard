import React from 'react';
import { Tooltip, Line, CartesianGrid, XAxis, YAxis, LineChart } from 'recharts';
import { zones } from './floorplans/AptE';

const colors = [
  '#8884d8',
  'magenta',
  'lime',
  'cyan'
];

const formatCreatedAt = createdAt => {
  const date = new Date(createdAt);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const Timeline = ({
  events,
}) => {
  const formattedEvents = events
    .map(({ roomName, temperature, createdAt }) => ({
      roomName,
      temperature,
      createdAt: formatCreatedAt(createdAt),
    }));
  const initialState = formattedEvents.reduce((acc, x) => {
    acc[x.roomName] = acc[x.roomName] || x.temperature;
    return acc;
  }, {});
  const eventsBySeries = formattedEvents.reduce(([prevTemps, eventsFinal], x) => {
    const newTemps = {
      ...prevTemps,
      [x.roomName]: x.temperature,
    }
    const event = {
      name: x.createdAt,
      ...newTemps,
    };
    return [newTemps, [...eventsFinal, event]];
  }, [initialState, []])[1];
  return (
    <LineChart width={500} height={300} data={eventsBySeries}>
      <Tooltip />
      <XAxis dataKey="name"/>
      <YAxis type="number" domain={['dataMin', 'dataMax']} />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      {Object.values(zones).map((zone, i) => (
        <Line type="monotone" key={zone} dataKey={zone} stroke={colors[i]} dot={false} />
      ))}
    </LineChart>
  );
};

export default Timeline;
