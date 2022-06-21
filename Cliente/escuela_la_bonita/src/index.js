import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from "./App"
import Provider from './AppContext/provider';
import ProviderInfoEncargado from './AppContext/providerInfoEncargado';



const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ProviderInfoEncargado>
      <Provider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </ProviderInfoEncargado>
  );
