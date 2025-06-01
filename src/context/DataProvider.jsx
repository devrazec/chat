import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  // Users
  const [dbUsers, setDbUsers] = useState([]);

  return (
    <DataContext.Provider
      value={{
        darkMode,
        setDarkMode,

        // Users
        dbUsers,
        setDbUsers,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
