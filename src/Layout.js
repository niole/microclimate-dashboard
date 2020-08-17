import React from 'react';

const Layout = ({
  titles,
  views,
}) => {
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      <div>
        {titles.map((title, i) => (
          <h2
            style={{
              display: 'inline-block',
              cursor: 'pointer',
              paddingRight: '25px',
              fontWeight: i === index ? 'bold' : 'normal'
            }}
            onClick={() => setIndex(i)}
          >
          {title}
          </h2>
        ))}
      </div>
      <div>
        {views[index]}
      </div>
    </div>
  );
};

export default Layout;
