import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from "./App"
import Provider from './AppContext/provider';
import ProviderInfoEncargado from './AppContext/providerInfoEncargado';
import ProviderInfoEstudiante from './AppContext/providerEstudiante';



const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ProviderInfoEstudiante>
      <ProviderInfoEncargado>
        <Provider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </ProviderInfoEncargado>
    </ProviderInfoEstudiante>
  );
