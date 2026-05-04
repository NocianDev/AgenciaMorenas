import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CustomsPage from './pages/CustomsPage';
import TrucksPage from './pages/TrucksPage';
import TrackingPage from './pages/TrackingPage';
import OfficesPage from './pages/OfficesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/agencia-aduanal" element={<CustomsPage />} />
        <Route path="/transporte-camiones" element={<TrucksPage />} />
        <Route path="/rastreo-gps" element={<TrackingPage />} />
        <Route path="/oficinas" element={<OfficesPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
