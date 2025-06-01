import React, { useEffect, Suspense, useContext, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

// Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';

// Pages
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';

//Components

// Context
import { DataContext } from './context/DataProvider';

function App() {
  const { darkMode, setDarkMode } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />

        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/chat" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
