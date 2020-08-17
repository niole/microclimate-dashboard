import React from 'react';

export const zones = {
  livingroom: 'apte-livingroom',
  bathroom: 'apte-bathroom',
  bedroom: 'apte-bedroom',
  kitchen: 'apte-kitchen',
};

const AptE = ({
  kitchen,
  bedroom,
  bathroom,
  livingroom,
}) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <g>
        <rect fill="#fff" id="canvas_background" height="602" width="802" y="-1" x="-1"/>
        <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
          <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
        </g>
      </g>
      <g>
        <rect id="svg_3" height="370" width="693" y="67" x="19" stroke-width="1.5" stroke="#000" fill="#fff"/>
        <rect id="svg_4" height="205" width="246" y="69" x="463" stroke-width="1.5" stroke="#000" fill="#fff"/>
        <rect id="svg_5" height="206" width="126" y="69" x="333" stroke-width="1.5" stroke="#000" fill="#fff"/>
        <rect id="svg_6" height="209" width="307" y="69" x="21" stroke-width="1.5" stroke="#000" fill="#fff"/>
        <rect id="svg_8" height="155" width="686" y="279" x="23" stroke-width="1.5" stroke="#000" fill="#fff"/>
        <text stroke="#000" transform="matrix(6.194588656589588,0,0,5.170483105040375,-430.1177137386958,-678.4193733489051) " text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_9" y="170" x="80" stroke-width="0" fill="#000000">{kitchen}</text>
        <text  text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_10" y="158" x="494" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">{bedroom}</text>
        <text  text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_11" y="167" x="354" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">{bathroom}</text>
        <text  text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_12" y="371" x="145" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">{livingroom}</text>
      </g>
    </svg>
  );
};

export default AptE;
