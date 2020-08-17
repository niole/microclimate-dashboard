import React from 'react';

const Timeline = ({
  events,
}) => (
<div>{events.map(({ key, value, createdAt }) => (
  <div key={createdAt}>
    {key}{value}{createdAt}
  </div>
))}</div>
);

export default Timeline;
