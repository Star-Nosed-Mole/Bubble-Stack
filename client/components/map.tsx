import React, { Component, useState } from 'react';
import Bubble from './Bubble';

function Map() {
  const [data, setData] = useState({
    name: 'React',
    children: [
      {
        name: 'Redux',
        color: 'hsl(191, 70%, 50%)',
        loc: 13285
      },
      {
        name: 'Bootstrap',
        color: 'hsl(191, 70%, 50%)',
        loc: 13285
      }
    ]
  });

  // componentDidMount() {
  //   fetch('/api/')
  //     .then(res => res.json())
  //     .then((query) => {
  //       if (!Array.isArray(query)) characters = [];
  //       return this.setState({
  //         characters,
  //         fetchedTechs: true
  //       });
  //     })
  //     .catch(err => console.log('Map.componentDidMount: ERROR: ', err));
  // }

  return (
    <div className="bubbleContainer">
      {console.log('IN MAP: ', data)}
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
