import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LogoIntro from './components/LogoIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EnPista from './pages/EnPista';
import FueraDePista from './pages/FueraDePista';
import Calendario from './pages/Calendario';
import Tienda from './pages/Tienda';
import Legal from './pages/Legal';
import Simulador from './pages/Simulador';

function scrollToTop() {
  // scrollTop directo → elude CSS scroll-behavior: smooth
  // (behavior: 'instant' no es estándar y falla en algunos browsers)
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();

    // RAF: después del primer paint (absorbe layout shifts tempranos)
    const raf = requestAnimationFrame(scrollToTop);

    // Timers progresivos para contenido que carga tarde (imágenes, GSAP)
    const t100 = setTimeout(scrollToTop, 100);
    const t300 = setTimeout(scrollToTop, 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t100);
      clearTimeout(t300);
    };
  }, [pathname]);
  return null;
}

function PageMeta() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const base = 'Alan Ampudia';
    const names = {
      '/': '',
      '/en-pista': lang === 'es' ? 'En Pista' : 'On Track',
      '/fuera-de-pista': lang === 'es' ? 'Fuera de Pista' : 'Off Track',
      '/calendario': lang === 'es' ? 'Calendario' : 'Calendar',
      '/tienda': lang === 'es' ? 'Tienda' : 'Shop',
      '/legal': lang === 'es' ? 'Legal' : 'Legal',
      '/simulador': lang === 'es' ? 'Simulador' : 'Simulator',
    };
    const name = names[pathname] ?? '';
    document.title = name ? `${name} — ${base}` : base;
  }, [pathname, lang]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <PageMeta />
        <LogoIntro />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/en-pista" element={<EnPista />} />
          <Route path="/fuera-de-pista" element={<FueraDePista />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/simulador" element={<Simulador />} />
        </Routes>
        <Footer />
        <Analytics />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
