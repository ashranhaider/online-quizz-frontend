import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import AppRoutes from './app/router/AppRoutes';
import { ReactQueryProvider } from './app/providers/ReactQueryProvider';
import { AuthProvider } from './app/providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
