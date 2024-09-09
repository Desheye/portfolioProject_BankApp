// Main.js
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigate from './Components/Navigate';
import SignUpForm from './Components/SignUpForm';
import AccountDashboard from './Components/AccountDashboard';
import TransactionForm from './Components/TransactionForm';
import SecurityInputDropdown from './Components/SecurityInputDropdown';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import AccountPage from './Pages/AccountPage';
import ContactPage from './Pages/ContactPage';
import CareerPage from './Pages/CareerPage';
import '../src/Main.css';



function Main() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    navigate('/', { replace: true }); // Use replace: true to avoid adding a new entry to the browser's history
  }

  return (
    <div className="Main-Container">
      <header>
        <h1>Bank Of The SouthWesternLands</h1>
      </header>
       <Navigate isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <Routes>
      <Route path="/" element={<HomePage isMenuOpen={isMenuOpen} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/account" element={<AccountPage isMenuOpen={isMenuOpen}/>} />
      <Route path="/contact" element={<ContactPage isMenuOpen={isMenuOpen} />} />
      <Route path="/career" element={<CareerPage isMenuOpen={isMenuOpen} />} />
      <Route path="/open_account" element={<SignUpForm />} />
      <Route path="/account-dashboard" element={<AccountDashboard isMenuOpen={isMenuOpen} userType="pin" userValue="1234" />} />
      <Route path="/transaction-form" element={<TransactionForm  isMenuOpen={isMenuOpen}/>} />
      <Route path="/login-dropdown" element={<SecurityInputDropdown />} />
        <Route path="*" element={<HomePage />} /> {/* Add a default route to handle unknown routes */}
      </Routes>
    </div>
  );
}

export default Main;