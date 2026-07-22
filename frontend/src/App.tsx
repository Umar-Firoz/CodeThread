import React from 'react';
import { AuthProvider } from './store/authStore';
import AppRoutes from './routes/AppRoutes';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
