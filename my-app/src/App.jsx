// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Afisha from './pages/Afisha.jsx';
import Film from './pages/Film.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Notifications from './pages/Notifications.jsx';
import SupportPage from './pages/SupportPage.jsx'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Afisha />} />
      <Route path="/afisha" element={<Afisha />} />
      <Route path="/film" element={<Film />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/support" element={<SupportPage />} /> 
    </Routes>
  );
}

export default App;