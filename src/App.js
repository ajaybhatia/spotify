import React from 'react';
import AppNavigation from './navigation';

import SpotifyProvider from './spotify';

const App = () => {
  return (
    <SpotifyProvider>
      <AppNavigation />
    </SpotifyProvider>
  );
};

export default App;
