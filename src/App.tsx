import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PainelCorban from './routes/PainelCorban';
import ValidacaoDossie from './routes/ValidacaoDossie';
import BarraSuperior from './components/layout/BarraSuperior';
import styles from './App.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.root}>
        <BarraSuperior />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<PainelCorban />} />
            <Route path="/dossie/:propostaId" element={<ValidacaoDossie />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}



