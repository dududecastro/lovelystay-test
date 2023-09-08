import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import SearchUserPage from './pages/SearchUserPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<SearchUserPage />} />
        <Route path='/:username' element={<UserPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
