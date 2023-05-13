import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { themeOptions, theme } from './components/themes/theme';
import { IciraView } from './components/icira';
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material';
{/* <ThemeProvider theme={themeOptions}> */}// </ThemeProvider>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ThemeProvider theme={themeOptions}>
    <CssBaseline>
  <BrowserRouter>
    <IciraView/>
  </BrowserRouter>
  </CssBaseline>
  </ThemeProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
