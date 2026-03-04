import { FeatureToggleProvider } from './contexts/FeatureToggleContext';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FeatureToggleProvider>
      <App />
    </FeatureToggleProvider>
  </StrictMode>,
);
