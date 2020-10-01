import React, { FunctionComponent } from 'react';

type Props = {};

const LoadingScreen: FunctionComponent<Props> = () => (
  <div style={{
    padding: 16,
    width: 360,
    margin: '100px'
      + ' auto',
  }}
  >
    <div>

      <h1 className="title is-1">Title 1</h1>
      <progress className="progress is-small is-primary" max="100">15%</progress>
    </div>
  </div>
);

export default LoadingScreen;
