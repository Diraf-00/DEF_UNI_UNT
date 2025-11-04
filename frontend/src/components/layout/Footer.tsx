import { Mail } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={`${styles.footer} py-8 mt-auto`} aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="footer-heading" className="sr-only">
          Pie de página
        </h2>

  <div className={`${styles.columns} items-start`}>
          <div>
            <h4 className={`${styles.heading} mb-3`}>UBICACIÓN</h4>
            <div className={`${styles.body} space-y-2`}>
              <p className={`${styles.body} leading-relaxed`}>
                Av. Juan Pablo II S/N, Urb. San Andrés (Ciudad Universitaria)
              </p>
              <p className={`${styles.small}`}>Pool de aulas: Edificio Administrativo (1er piso)</p>
              <p className={`${styles.small}`}>Referencia: A la altura de la priemra puerta de la UNT</p>
              <p className={`${styles.body} font-semibold mt-4`}>Horario de atención presencial:</p>
              <p className={`${styles.small}`}>Lunes a viernes 7:00 a.m. a 2:45 p.m.</p>
            </div>
          </div>

          <div>
            <h4 className={`${styles.heading} mb-3`}>CONTACTO</h4>
            <div className={`${styles.body} space-y-2`}>
              <div>
                <p className={`${styles.body} font-semibold`}>Correo electrónico</p>
                <a href="mailto:mesadepartes_defensoria@unitru.edu.pe" className={`${styles.link} inline-flex items-center`}>
                  <Mail className="w-4 h-4 mr-2" /> mesadepartes_defensoria@unitru.edu.pe
                </a>
              </div>

              {/* Atención virtual y horarios (según póster) */}
              <div className="mt-2">
                <p className={`${styles.body} font-semibold`}>Horario de atención virtual: </p>
                <p className={`${styles.small}`}>Miércoles de 1:00 p.m. a 4:00 p.m.</p>
                <p className={`${styles.small}`}>Viernes de 1:00 p.m. a 3:00 p.m.</p>
              </div>
            </div>
          </div>

          {/* Enlaces de interés (columna 3) */}
          <div>
            <h4 className={`${styles.heading} mb-3`}>ENLACES DE INTERÉS</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://sgdunt.unitru.edu.pe/" target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.small}`}>
                  Sistema de Gestión Documentaria
                </a>
              </li>
            </ul>
          </div>
        </div>

        
          <div className={styles.follow}>
            <div className={styles.divider} aria-hidden="true" />
            <p className={`${styles.heading}`}>SÍGUENOS EN</p>
            <a
              href="https://www.facebook.com/share/1DZQtZsosm/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.social} ${styles.link} mt-2`}
              aria-label="Ir a Facebook"
            >
              <svg className={styles.fbIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.874h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.99 22 12z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
          </div>

        <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Universidad Nacional de Trujillo. Todos
            los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}