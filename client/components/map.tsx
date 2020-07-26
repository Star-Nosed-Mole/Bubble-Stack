import React, { Component, useState } from 'react';
import Bubble from './Bubble';

function Map() {
  const [data, setData] = useState({
    data: {
      name: 'Bubble-Stack',
      children: [
        {
          name: 'React',
          color: 'hsl(191, 70%, 50%)',
          loc: 13285
        }
      ]
    }
  });

  return (
    <div className="bubbleContainer">
      <Bubble data={data} />
    </div>
  );
}

export default Map;

// import React, { Component } from 'react';
// import Bubble from './Bubble.tsx';

// // import MainContainer from './containers/MainContainer';
// class Map extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="container">
//         <Bubble />
//       </div>
//     );
//   }
// }
// export default Map;
