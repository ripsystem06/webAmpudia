import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LogoIntro from './components/LogoIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EnPista from './pages/EnPista';
import FueraDePista from './pages/FueraDePista';
import Calendario from './pages/Calendario';
import Equipo from './pages/Equipo';
import Tienda from './pages/Tienda';
import Legal from './pages/Legal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LogoIntro />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/en-pista" element={<EnPista />} />
        <Route path="/fuera-de-pista" element={<FueraDePista />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
