import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Main from '@/pages/Main'
import Room from '@/pages/Room'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/room' element={<Room />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
