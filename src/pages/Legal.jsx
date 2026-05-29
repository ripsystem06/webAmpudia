export default function Legal() {
  return (
    <div style={{ paddingTop: '67px', minHeight: '100vh', background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        padding: '4rem 4rem 2rem',
        background: 'linear-gradient(135deg, #0a0a1a 0%, var(--black) 60%)',
        borderBottom: '1px solid rgba(233,30,99,0.15)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', right: '1rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(6rem, 14vw, 10rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.05)',
          lineHeight: 1, userSelect: 'none',
        }}>LEGAL</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            letterSpacing: '0.3em', color: 'var(--magenta-bright)',
            textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>
            Información Legal
          </div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            lineHeight: 1.15, color: 'var(--white)', margin: 0,
          }}>
            TÉRMINOS <span style={{ color: 'var(--magenta)' }}>LEGALES</span>
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem',
            color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1rem',
            maxWidth: '520px',
          }}>
            Toda la información legal aplicable a México y Estados Unidos.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: 'clamp(2rem, 5vw, 5rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* ── MÉXICO ── */}
          <CountryHeader flag="🇲🇽" title="México" />

          <Section title="Términos y Condiciones" id="terminos-mx">
            <Sub title="1. Aceptación de los Términos">
              Al acceder y utilizar este sitio web (alanampudia.com), usted acepta cumplir y estar sujeto a los siguientes Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar este sitio.
            </Sub>
            <Sub title="2. Identidad del Titular">
              Este sitio web es operado por Alan Ampudia / Team Papas Racing, con domicilio en Ensenada, Baja California, México. Para cualquier comunicación legal: <a href="mailto:legal@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>legal@alanampudia.com</a>.
            </Sub>
            <Sub title="3. Uso del Sitio Web">
              El contenido de este sitio web es para su información general y uso personal. Está sujeto a cambios sin previo aviso. Usted se compromete a no utilizar este sitio para fines ilegales o no autorizados.
            </Sub>
            <Sub title="4. Propiedad Intelectual">
              Todo el contenido de este sitio, incluyendo pero no limitado a textos, imágenes, logotipos, marcas, vídeos, gráficos y diseño, es propiedad de Alan Ampudia / Team Papas Racing o de sus respectivos licenciantes. Queda estrictamente prohibida la reproducción, distribución o modificación sin autorización previa por escrito.
            </Sub>
            <Sub title="5. Productos y Tienda">
              Los productos ofrecidos en nuestra tienda están sujetos a disponibilidad. Los precios pueden cambiar sin previo aviso. Nos reservamos el derecho de modificar o descontinuar cualquier producto en cualquier momento.
            </Sub>
            <Sub title="6. Envíos y Devoluciones">
              Los plazos de envío son estimados. No nos hacemos responsables por retrasos causados por servicios de paquetería. Las devoluciones se aceptan dentro de los 30 días posteriores a la recepción del producto, siempre que éste se encuentre en condiciones originales.
            </Sub>
            <Sub title="7. Limitación de Responsabilidad">
              Alan Ampudia / Team Papas Racing no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso de este sitio web o de los productos adquiridos a través del mismo.
            </Sub>
            <Sub title="8. Ley Aplicable y Jurisdicción">
              Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa relacionada con estos términos será sometida a la jurisdicción de los tribunales competentes en Ensenada, Baja California, México.
            </Sub>
            <Sub title="9. Cambios a los Términos">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
            </Sub>
          </Section>

          <Section title="Política de Privacidad" id="privacidad-mx">
            <Sub title="1. Responsable del Tratamiento">
              Alan Ampudia / Team Papas Racing, con domicilio en Ensenada, Baja California, México, es el responsable del tratamiento de sus datos personales, de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
            </Sub>
            <Sub title="2. Datos Personales Recabados">
              Podemos recabar los siguientes datos personales: nombre completo, dirección de correo electrónico, dirección de envío, número de teléfono e información de pago.
            </Sub>
            <Sub title="3. Finalidad del Tratamiento">
              Sus datos personales serán utilizados para: (a) procesar y enviar pedidos; (b) comunicar información sobre pedidos y servicios; (c) enviar comunicaciones promocionales (previo consentimiento); (d) mejorar nuestros productos y servicios; (e) cumplir con obligaciones legales.
            </Sub>
            <Sub title="4. Derechos ARCO">
              Usted tiene derecho a Acceder, Rectificar, Cancelar y Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos: <a href="mailto:privacidad@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>privacidad@alanampudia.com</a>.
            </Sub>
            <Sub title="5. Transferencia de Datos">
              Sus datos NO serán transferidos a terceros sin su consentimiento, salvo las excepciones previstas en la ley.
            </Sub>
            <Sub title="6. Medidas de Seguridad">
              Hemos implementado medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.
            </Sub>
            <Sub title="7. Cambios a la Política">
              Nos reservamos el derecho de modificar esta política en cualquier momento. Los cambios serán publicados en esta página.
            </Sub>
          </Section>

          <Section title="Aviso Legal" id="aviso-mx">
            <Sub title="1. Información General">
              En cumplimiento con lo establecido por la legislación mexicana aplicable en materia de comercio electrónico y protección al consumidor.
            </Sub>
            <Sub title="2. Datos del Titular">
              <strong>Titular:</strong> Alan Ampudia / Team Papas Racing<br />
              <strong>Domicilio:</strong> Ensenada, Baja California, México<br />
              <strong>Correo:</strong> <a href="mailto:legal@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>legal@alanampudia.com</a><br />
              <strong>Actividad:</strong> Piloto profesional de off-road, comercialización de productos y mercancía oficial.
            </Sub>
            <Sub title="3. Condiciones de Acceso">
              El acceso a este sitio web es gratuito y no requiere registro previo, salvo para compras en la tienda.
            </Sub>
            <Sub title="4. Propiedad Intelectual e Industrial">
              Todos los derechos de propiedad intelectual e industrial sobre los contenidos de este sitio web están reservados.
            </Sub>
            <Sub title="5. Exclusión de Responsabilidad">
              El titular no se hace responsable de los daños y perjuicios que pudieran derivarse de interferencias, omisiones, interrupciones o virus informáticos.
            </Sub>
            <Sub title="6. Legislación Aplicable">
              Las presentes condiciones se rigen por la legislación mexicana. Para cualquier controversia, las partes se someten a los tribunales de Ensenada, Baja California.
            </Sub>
          </Section>

          {/* ── GLOBAL ── */}
          <CountryHeader flag="🌐" title="Global" />

          <Section title="Política de Cookies" id="cookies">
            <Sub title="1. ¿Qué son las Cookies?">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo cuando los visita.
            </Sub>
            <Sub title="2. Tipos de Cookies Utilizadas">
              <strong>Cookies Esenciales:</strong> necesarias para el funcionamiento básico del sitio (carrito de compras, sesión).<br /><br />
              <strong>Cookies de Análisis:</strong> utilizamos Google Analytics para entender cómo los visitantes interactúan con el sitio.<br /><br />
              <strong>Cookies de Funcionalidad:</strong> recuerdan sus preferencias para mejorar su experiencia.<br /><br />
              <strong>Cookies de Marketing:</strong> utilizadas por plataformas de redes sociales (Instagram, YouTube) al interactuar con contenido embebido.
            </Sub>
            <Sub title="3. Cookies de Terceros">
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Google Analytics — análisis de tráfico web</li>
                <li>Shopify / Plataforma de tienda — procesamiento de pedidos</li>
                <li>YouTube — reproducción de vídeos embebidos</li>
                <li>Instagram — publicaciones embebidas</li>
              </ul>
            </Sub>
            <Sub title="4. Cómo Gestionar las Cookies">
              Usted puede controlar y/o eliminar las cookies según desee desde la configuración de su navegador.
            </Sub>
            <Sub title="5. Consentimiento">
              Al utilizar nuestro sitio web, usted acepta el uso de cookies de acuerdo con esta Política.
            </Sub>
            <Sub title="6. Más Información">
              Contacto: <a href="mailto:privacidad@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>privacidad@alanampudia.com</a>.
            </Sub>
          </Section>

          {/* ── UNITED STATES ── */}
          <CountryHeader flag="🇺🇸" title="United States" />

          <Section title="Terms & Conditions" id="terms-us">
            <Sub title="1. Acceptance of Terms">
              By accessing and using alanampudia.com, you agree to be bound by these Terms & Conditions. If you disagree with any part, you must not use this website.
            </Sub>
            <Sub title="2. Site Owner">
              This website is operated by Alan Ampudia / Team Papas Racing, based in Ensenada, Baja California, Mexico. Legal inquiries: <a href="mailto:legal@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>legal@alanampudia.com</a>.
            </Sub>
            <Sub title="3. Intellectual Property">
              All content on this site — including text, images, logos, trademarks, videos, graphics, and design — is the property of Alan Ampudia / Team Papas Racing or its licensors. Reproduction without prior written consent is strictly prohibited.
            </Sub>
            <Sub title="4. Online Store">
              Products offered in our store are subject to availability. Prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time.
            </Sub>
            <Sub title="5. Shipping & Returns">
              Shipping timeframes are estimates. Returns are accepted within 30 days of receipt, provided the product is in original condition.
            </Sub>
            <Sub title="6. Limitation of Liability">
              In no event shall Alan Ampudia / Team Papas Racing be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website.
            </Sub>
            <Sub title="7. California Consumer Privacy (CCPA)">
              If you are a California resident, you have additional rights under the CCPA. Please refer to our Privacy Policy for details.
            </Sub>
            <Sub title="8. Governing Law">
              These terms shall be governed by the laws of the State of California, United States of America.
            </Sub>
            <Sub title="9. Changes to Terms">
              We reserve the right to modify these terms at any time. Changes take effect immediately upon posting.
            </Sub>
          </Section>

          <Section title="Privacy Policy" id="privacy-us">
            <Sub title="1. Information We Collect">
              We may collect: full name, email address, shipping address, phone number, and payment information when you place an order or contact us.
            </Sub>
            <Sub title="2. How We Use Your Information">
              Your information is used to: (a) process orders; (b) communicate about orders; (c) send marketing communications (with consent); (d) improve services; (e) comply with legal obligations.
            </Sub>
            <Sub title="3. California Privacy Rights (CCPA)">
              California residents have the right to know what data is collected, request deletion, opt-out of sale (we do not sell data), and non-discrimination. Contact: <a href="mailto:privacy@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>privacy@alanampudia.com</a>.
            </Sub>
            <Sub title="4. Children's Privacy (COPPA)">
              Our website is not directed to children under 13, and we do not knowingly collect their personal information.
            </Sub>
            <Sub title="5. Data Sharing">
              We do not sell, trade, or rent your personal information to third parties.
            </Sub>
            <Sub title="6. Data Security">
              We implement industry-standard security measures including SSL encryption and secure payment gateways.
            </Sub>
            <Sub title="7. International Users">
              By using our site from outside the US, you consent to data transfer to and processing in the United States.
            </Sub>
            <Sub title="8. Contact">
              For privacy inquiries: <a href="mailto:privacy@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>privacy@alanampudia.com</a>.
            </Sub>
          </Section>

          <Section title="Legal Notice" id="notice-us">
            <Sub title="1. Site Ownership">
              This website (alanampudia.com) is owned and operated by Alan Ampudia / Team Papas Racing.
            </Sub>
            <Sub title="2. Contact Information">
              <strong>Owner:</strong> Alan Ampudia / Team Papas Racing<br />
              <strong>Location:</strong> Ensenada, Baja California, Mexico<br />
              <strong>Email:</strong> <a href="mailto:legal@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>legal@alanampudia.com</a>
            </Sub>
            <Sub title="3. Copyright Notice">
              © {new Date().getFullYear()} Alan Ampudia / Team Papas Racing. All rights reserved.
            </Sub>
            <Sub title="4. DMCA Compliance">
              To file a DMCA takedown notice, contact <a href="mailto:legal@alanampudia.com" style={{ color: 'var(--magenta-bright)' }}>legal@alanampudia.com</a> with identification of the copyrighted work, infringing material, and your contact information.
            </Sub>
            <Sub title="5. FTC Disclosure">
              Sponsors and partners are clearly identified. We comply with FTC guidelines regarding endorsements and testimonials.
            </Sub>
            <Sub title="6. Third-Party Links">
              This site contains links to external websites. We are not responsible for their content or privacy practices.
            </Sub>
            <Sub title="7. Disclaimer">
              The information on this website is for general informational purposes only. We make no warranties about completeness or accuracy.
            </Sub>
            <Sub title="8. Governing Jurisdiction">
              This Legal Notice is governed by the laws of the State of California, USA.
            </Sub>
          </Section>

          {/* Footer info */}
          <div style={{
            marginTop: 'clamp(3rem, 5vw, 5rem)',
            paddingTop: 'clamp(2rem, 3vw, 3rem)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '0.9rem',
              color: 'var(--white-dim)',
              lineHeight: 1.6,
            }}>
              Última actualización: 29 de mayo de 2026<br />
              © {new Date().getFullYear()} Alan Ampudia / Team Papas Racing. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountryHeader({ flag, title }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      marginTop: 'clamp(3rem, 5vw, 5rem)',
      marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
      paddingBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)',
      borderBottom: '2px solid var(--magenta)',
    }}>
      <span style={{ fontSize: '1.5rem' }}>{flag}</span>
      <h2 style={{
        fontFamily: 'Anton, sans-serif',
        fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
        color: 'var(--white)',
        margin: 0,
        lineHeight: 1,
      }}>
        {title}
      </h2>
    </div>
  );
}

function Section({ title, id, children }) {
  return (
    <div id={id} style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
      <h3 style={{
        fontFamily: 'Anton, sans-serif',
        fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
        color: 'var(--magenta-bright)',
        letterSpacing: '0.04em',
        marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        lineHeight: 1.15,
      }}>
        {title}
      </h3>
      <div style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontSize: '1rem',
        color: 'var(--white-soft)',
        lineHeight: 1.8,
      }}>
        {children}
      </div>
    </div>
  );
}

function Sub({ title, children }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <strong style={{ color: 'var(--white)', display: 'block', marginBottom: '0.3rem' }}>{title}</strong>
      <p style={{ margin: 0 }}>{children}</p>
    </div>
  );
}
