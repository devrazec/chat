import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  // Users
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  const [allMessages, setAllMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState([]);

  return (
    <DataContext.Provider
      value={{
        darkMode,
        setDarkMode,

        allUsers, setAllUsers,
        selectedUser, setSelectedUser,

        allMessages, setAllMessages,
        selectedMessage, setSelectedMessage,

      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
