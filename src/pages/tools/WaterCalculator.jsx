import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

export default function WaterCalculator() {
  const [weight, setWeight] = useState('');
  const [heavyActivity, setHeavyActivity] = useState(false);
  const [result, setResult] = useState(null);

  const calculateWater = (e) => {
    e.preventDefault();
    if (!weight) return;

    const w = parseFloat(weight);

    if (w > 0) {
      let totalMl = w * 35;
      if (heavyActivity) {
        totalMl += 500;
      }

      const liters = (totalMl / 1000).toFixed(1);
      const glasses = Math.ceil(totalMl / 250);

      setResult({
        liters,
        glasses
      });
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeavyActivity(false);
    setResult(null);
  };

  return (
    <>
      <SEOHead title="Kalkulator Kebutuhan Air Putih | Kenali Tubuhmu - Senadee" />
      
      <div className="bg-surface-container-lowest min-h-screen py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 text-sm font-bold text-on-surface-variant">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">home</span>
              Beranda
            </Link>
            <span className="text-surface-container-high">/</span>
            <Link to="/kenali-tubuhmu" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
              Semua Alat
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-cyan-100 text-cyan-600">
              <span className="material-symbols-outlined text-[28px]">water_drop</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Kebutuhan Air Putih</h1>
              <p className="text-on-surface-variant">Estimasi liter dan jumlah gelas air yang wajib Anda minum hari ini.</p>
            </div>
          </div>

          <div className="bg-white border border-surface-container rounded-3xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={calculateWater} className="space-y-6">
              
              <div className="space-y-2">
                <label htmlFor="weight" className="block text-sm font-bold text-on-surface">Berat Badan Aktual (kg)</label>
                <input
                  id="weight"
                  type="number"
                  min="1"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Contoh: 65"
                  required
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-on-surface"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface mb-2">Tingkat Aktivitas Berkeringat</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all text-center ${!heavyActivity ? 'border-cyan-500 bg-cyan-50 text-cyan-700 font-bold' : 'border-surface-container text-on-surface-variant hover:bg-surface-container-low'}`}>
                    <input type="radio" name="activity" checked={!heavyActivity} onChange={() => setHeavyActivity(false)} className="hidden" />
                    <span className="material-symbols-outlined text-[24px]">chair_alt</span>
                    <span className="text-sm">Biasa Saja / Di Ruangan</span>
                  </label>
                  <label className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all text-center ${heavyActivity ? 'border-cyan-500 bg-cyan-50 text-cyan-700 font-bold' : 'border-surface-container text-on-surface-variant hover:bg-surface-container-low'}`}>
                    <input type="radio" name="activity" checked={heavyActivity} onChange={() => setHeavyActivity(true)} className="hidden" />
                    <span className="material-symbols-outlined text-[24px]">directions_run</span>
                    <span className="text-sm">Fisik Berat / Berkeringat</span>
                  </label>
                </div>
              </div>

              {!result ? (
                <button type="submit" className="w-full py-4 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">opacity</span>
                  Hitung Target Air
                </button>
              ) : (
                <button type="button" onClick={resetForm} className="w-full py-4 bg-surface-container-low text-on-surface-variant rounded-xl font-bold hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">refresh</span>
                  Hitung Ulang
                </button>
              )}
            </form>

            {/* Result Area */}
            {result && (
              <div className="mt-8 pt-8 border-t border-surface-container animate-fade-in">
                <h3 className="text-center text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-6">Target Hidrasi Harian Anda</h3>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-6xl font-heading font-black text-cyan-600 mb-2">
                      {result.liters} <span className="text-2xl font-body font-normal text-cyan-600/80">Liter</span>
                    </div>
                    <div className="text-sm text-on-surface-variant">Total Volume Air</div>
                  </div>

                  <div className="hidden md:block w-px h-16 bg-surface-container"></div>

                  <div className="flex flex-col items-center text-center">
                    <div className="text-6xl font-heading font-black text-blue-600 mb-2">
                      ±{result.glasses} <span className="text-2xl font-body font-normal text-blue-600/80">Gelas</span>
                    </div>
                    <div className="text-sm text-on-surface-variant">Asumsi 1 gelas = 250ml</div>
                  </div>
                </div>

                <div className="mt-8 bg-cyan-50 border border-cyan-100 rounded-xl p-5 text-sm text-cyan-800 leading-relaxed text-center">
                  <strong>Tips:</strong> Minumlah secara berkala. Jangan menunggu sampai merasa sangat haus, karena haus adalah sinyal awal dehidrasi.
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
