import React from 'react';
import { Tooltip, Line, CartesianGrid, XAxis, YAxis, LineChart } from 'recharts';
import { zones } from './floorplans/AptE';

const formatCreatedAt = createdAt => {
  const date = new Date(createdAt);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const Timeline = ({
  events,
}) => {
  const formattedEvents = events.map(({ key, value, createdAt }) => ({
      [key]: value,
      createdAt: formatCreatedAt(createdAt),
  }));
  return (
    <LineChart width={500} height={300} data={formattedEvents}>
      <Tooltip />
      <XAxis dataKey="createdAt"/>
      <YAxis/>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      {Object.values(zones).map(zone => (
        <Line type="monotone" key={zone} dataKey={zone} stroke="#8884d8" />
      ))}
    </LineChart>
  );
};

export default Timeline;
