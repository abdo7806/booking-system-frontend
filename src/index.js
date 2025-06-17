import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//redux
import { Provider } from 'react-redux';
import {store} from './app/store'; // تأكد من مسار store


// theme
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';

// إنشاء كاش RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export function RTLProvider({ children }) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
   
    <Provider store={store}>
      <RTLProvider>
     <ThemeProvider theme={theme}>
         <CssBaseline />
         <App />
      </ThemeProvider>
      </RTLProvider>
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
