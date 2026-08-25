import { Mail, MapPin, Clock, ChevronRight } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={`${styles.footer} py-12 mt-auto`} aria-labelledby="footer-heading">
      <div className="max-w-[1050px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="footer-heading" className="sr-only">
          Pie de página
        </h2>

        <div className={styles.columns}>

          {/* Columna 1: Ubicación */}
          <div style={{ paddingLeft: '50px' }}>
            <h4 className={styles.heading}>UBICACIÓN</h4>
            <div className={styles.contentList}>
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-[#e6ad09] flex-shrink-0 mt-0.5" />
                <div>
                  <p className={styles.bodyText}>
                    Av. Juan Pablo II, Urb. San Andrés (Ciudad Universitaria)
                  </p>
                  <p className={styles.smallText}>Pool de aulas de Ciencias Económicas - Edificio Administrativo (1er piso)</p>
                  <p className={styles.smallText}>Ref: A la altura de la primera puerta de la UNT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: Contacto y Horarios */}
          <div style={{ paddingLeft: '90px' }}>
            <h4 className={styles.heading}>CONTACTO Y ATENCIÓN</h4>
            <div className={styles.contentList}>
              <div className="flex items-start space-x-2 mb-3">
                <Mail className="w-5 h-5 text-[#e6ad09] flex-shrink-0 mt-0.5" />
                <div>
                  <p className={`${styles.bodyText} font-semibold`}>Correo electrónico</p>
                  <a href="mailto:mesadepartes_defensoria@unitru.edu.pe" className={styles.link}>
                    mesadepartes_defensoria@unitru.edu.pe
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-[#e6ad09] flex-shrink-0 mt-0.5" />
                <div>
                  <p className={`${styles.bodyText} font-semibold`}>Horario Presencial</p>
                  <p className={styles.smallText}>Lunes a viernes: 7:00 a.m. a 2:45 p.m.</p>
                </div>
              </div>
            </div>
          </div>

          {/*Columna 3: Enlaces de Interés */}
          <div style={{ paddingLeft: '50px' }}>
            <h4 className={styles.heading}>ENLACES DE INTERÉS</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="https://www.unitru.edu.pe/" target="_blank" rel="noopener noreferrer" className={styles.listLink}>
                  <ChevronRight className="w-4 h-4 text-[#e6ad09] flex-shrink-0" />
                  <span>Portal Principal UNT</span>
                </a>
              </li>
              <li>
                <a href="https://aulavirtual2.unitru.edu.pe/" target="_blank" rel="noopener noreferrer" className={styles.listLink}>
                  <ChevronRight className="w-4 h-4 text-[#e6ad09] flex-shrink-0" />
                  <span>Aula Virtual UNT</span>
                </a>
              </li>
              <li>
                <div className={styles.socialIcons}>
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/1DZQtZsosm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="Ir a Facebook"
                  >
                    <svg className={styles.fbIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.874h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.99 22 12z" />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra Inferior limpia (Solo Copyright) */}
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            &copy; {new Date().getFullYear()} Universidad Nacional de Trujillo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}