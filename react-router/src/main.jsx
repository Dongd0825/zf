import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
