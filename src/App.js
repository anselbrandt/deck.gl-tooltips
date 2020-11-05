import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import * as Locations from './locations';
import Map from './Map';
import { FlyToInterpolator } from 'react-map-gl';
import { csv } from 'd3';

function App() {
  const [viewState, setViewState] = useState(Locations.NYC);
  const handleChangeViewState = ({ viewState }) => setViewState(viewState);
  const handleFlyTo = destination => {
    setViewState({
      ...viewState,
      ...destination,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    csv('./data/public_libraries.csv', (d, id) => ({
      id,
      name: d['Location Name'],
      type: d['Location Type'],
      city: d['City'],
      state: d['State'],
      position: [+d['Longitude'], +d['Latitude']],
    }))
      .then(libraries =>
        libraries.filter(d => d.position[0] != null && d.position[1] != null),
      )
      .then(setLibraries);
  }, []);

  const [radius, setRadius] = useState(0);
  const handleToggleRadius = () => setRadius(radius > 0 ? 0 : 5);

  return (
    <div>
      <Map
        width="100vw"
        height="100vh"
        viewState={viewState}
        onViewStateChange={handleChangeViewState}
        libraries={libraries}
        radius={radius}
      />
      <div className={styles.controls}>
        <button onClick={handleToggleRadius}>Libraries</button>
        {Object.keys(Locations).map(key => {
          return (
            <button key={key} onClick={() => handleFlyTo(Locations[key])}>
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
