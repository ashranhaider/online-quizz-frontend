import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from './app/router/AppRoutes';
import { ReactQueryProvider } from './app/providers/ReactQueryProvider';
import { AuthProvider } from './app/providers/AuthProvider';
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ReactQueryProvider>
          <AuthProvider>
            <AppRoutes />
            <ToastContainer />
          </AuthProvider>
        </ReactQueryProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>

);
