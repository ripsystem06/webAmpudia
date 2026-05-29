import Hero from '../components/Hero';
import PerfilReveal from '../components/PerfilReveal';
// import CitaSection from '../components/CitaSection';
import GallerySection from '../components/GallerySection';
// import MensajePersonal from '../components/MensajePersonal';
// import GaleriaNarrativa from '../components/GaleriaNarrativa';
import PistaSection from '../components/PistaSection';
import ProductosPromo from '../components/ProductosPromo';
import Patrocinadores from '../components/Patrocinadores';

export default function Home() {
  return (
    <>
      <Hero />
      <PerfilReveal />
      {/* <CitaSection /> */}
      <GallerySection />
      {/* <MensajePersonal /> */}
      {/* <GaleriaNarrativa /> */}
      <PistaSection />
      <ProductosPromo />
      <Patrocinadores />
    </>
  );
}