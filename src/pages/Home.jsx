import Hero from '../components/Hero';
import PerfilReveal from '../components/PerfilReveal';
// import CitaSection from '../components/CitaSection';
import GallerySection from '../components/GallerySection';
// import MensajePersonal from '../components/MensajePersonal';
// import GaleriaNarrativa from '../components/GaleriaNarrativa';
import PistaSection from '../components/PistaSection';
import ProductosPromo from '../components/ProductosPromo';
import Patrocinadores from '../components/Patrocinadores';
import VideoSocialsBlock from '../components/VideoSocialsBlock';

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
      <VideoSocialsBlock
        videoId="QCDvZGz-Xps"
        instagramLinks={[
          { post: 'https://www.instagram.com/p/C5y6U9OS2QK/', img: '/fueradepista/corriendo.webp', label: 'Competencia' },
          { post: 'https://www.instagram.com/p/DY2owLGPc5m/', img: '/fueradepista/BAJA500-06072025-DSchenkelberg-1725.webp', label: 'Behind the Scenes' },
          { post: 'https://www.instagram.com/p/DYz7-b4PIrG/', img: '/fueradepista/fiesta.webp', label: 'StreetParty' },
          { post: 'https://www.instagram.com/p/DYf_qRfJV94/', img: '/fueradepista/BAJA400-2025-148.webp', label: 'Highlights' },
          null, null, null, null, null,
        ]}
      />
    </>
  );
}