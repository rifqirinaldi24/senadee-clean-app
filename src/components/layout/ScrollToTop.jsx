import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Memastikan scroll kembali ke paling atas tanpa animasi smooth 
    // agar langsung terasa instan seperti pindah halaman biasa.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null; // Komponen ini tidak me-render apapun ke UI
}
