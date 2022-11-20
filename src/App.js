import React from 'react';
import { BultenProvider } from './context/BultenProvider';
import Layout from './features/Layout';

const App = () => (
    <div className="app-container">
      <BultenProvider>
        <Layout />
      </BultenProvider>
    </div>
);

export default App;
