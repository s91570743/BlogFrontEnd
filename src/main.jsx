import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme();
ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </MantineProvider>
)
