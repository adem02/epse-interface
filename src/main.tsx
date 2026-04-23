import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import './lib/firebase/app';
import { AuthProvider } from './context/AuthProvider';
import { Toaster } from './components/ui/Toaster';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster />
  </AuthProvider>
)
