import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Nav from './components/Nav/Nav.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nav></Nav>
    <App />
  </StrictMode>,
)
