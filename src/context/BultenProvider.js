import React, { createContext } from 'react';
import * as bultenData from '../../bulten_data.json';

const BultenContext = createContext();
function BultenProvider({ children }) {
  return (
    <BultenContext.Provider value={bultenData}>
      {children}
    </BultenContext.Provider>
  );
}

export { BultenContext, BultenProvider };
