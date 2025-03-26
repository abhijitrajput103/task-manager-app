import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster component
import About from './pages/About'; 
import './App.css';
import Home from './pages/Home';

function App() {
  return (
     <>
        <Toaster /> 
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
      </Routes>
   
     </>
  )
}

export default App;
