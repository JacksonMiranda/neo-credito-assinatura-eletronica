import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BarraSuperior.module.css';

export default function BarraSuperior() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      {/* Barra superior mobile */}
      <header className={styles.barraMobile}>
        <button
          className={styles.botaoMenu}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
        >
          <span className="material-symbols-outlined">
            {menuAberto ? 'close' : 'menu'}
          </span>
        </button>
        <span className={styles.marcaMobile}>Neo Crédito</span>
      </header>

      {/* Backdrop mobile */}
      {menuAberto && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuAberto(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${menuAberto ? styles.sidebarAberta : ''}`}
        aria-label="Navegação principal"
      >
        <div className={styles.marca}>
          <div className={styles.logoArea}>
            <span className={`material-symbols-outlined ${styles.logoIcone}`}>
              verified
            </span>
          </div>
          <span className={styles.marcaTitulo}>Neo Crédito</span>
          <span className={styles.marcaSubtitulo}>Assinatura Eletrônica</span>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemAtivo : ''}`
            }
            onClick={() => setMenuAberto(false)}
          >
            <span className="material-symbols-outlined">dashboard</span>
            Painel CORBAN
          </NavLink>
          <NavLink
            to="/dossie"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemAtivo : ''}`
            }
            onClick={() => setMenuAberto(false)}
          >
            <span className="material-symbols-outlined">folder_open</span>
            Validação do Dossiê
          </NavLink>
        </nav>

        <div className={styles.rodape}>
          <div className={styles.perfilArea}>
            <div className={styles.avatar}>OP</div>
            <div className={styles.perfilInfo}>
              <span className={styles.perfilNome}>Operador</span>
              <span className={styles.perfilCargo}>Analista de crédito</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
