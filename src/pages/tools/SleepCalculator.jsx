import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

export default function SleepCalculator() {
  const [mode, setMode] = useState('wake'); // 'wake' or 'sleep'
  const [time, setTime] = useState('06:00');
  const [result, setResult] = useState(null);

  const calculateSleep = (e) => {
    e.preventDefault();
    if (!time) return;

    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    let times = [];

    if (mode === 'wake') {
      // Menghitung jam tidur jika ingin bangun jam X
      // Kita hitung mundur: Butuh 15 menit untuk tertidur + siklus 90 menit.
      // Opsi 1: 6 siklus (9 jam) + 15 menit = 9 jam 15 menit
      // Opsi 2: 5 siklus (7.5 jam) + 15 menit = 7 jam 45 menit
      const option1 = new Date(date.getTime() - (9 * 60 + 15) * 60000);
      const option2 = new Date(date.getTime() - (7 * 60 + 45) * 60000);
      
      times = [
        { label: '6 Siklus (Tidur Sempurna)', time: formatTime(option1) },
        { label: '5 Siklus (Cukup Baik)', time: formatTime(option2) }
      ];
    } else {
      // Menghitung jam bangun jika tidur jam X
      // Tambah 15 menit tertidur + siklus 90 menit
      // Opsi 1: 15 menit + 5 siklus (7.5 jam) = 7 jam 45 menit
      // Opsi 2: 15 menit + 6 siklus (9 jam) = 9 jam 15 menit
      const option1 = new Date(date.getTime() + (7 * 60 + 45) * 60000);
      const option2 = new Date(date.getTime() + (9 * 60 + 15) * 60000);

      times = [
        { label: '5 Siklus (Cukup Baik)', time: formatTime(option1) },
        { label: '6 Siklus (Tidur Sempurna)', time: formatTime(option2) }
      ];
    }

    setResult(times);
  };

  const formatTime = (d) => {
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const resetForm = () => {
    setResult(null);
  };

  return (
    <>
      <SEOHead title="Kalkulator Waktu Tidur | Kenali Tubuhmu - Senadee" />
      
      <div className="bg-surface-container-lowest min-h-screen py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          
          <Link to="/kenali-tubuhmu" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-8">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Semua Alat
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-indigo-100 text-indigo-600">
              <span className="material-symbols-outlined text-[28px]">bedtime</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Kalkulator Waktu Tidur</h1>
              <p className="text-on-surface-variant">Temukan jadwal tidur ideal berdasarkan siklus alami otak (90 menit).</p>
            </div>
          </div>

          <div className="bg-white border border-surface-container rounded-3xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={calculateSleep} className="space-y-6">
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-on-surface">Pilih Skenario Anda</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${mode === 'wake' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold' : 'border-surface-container text-on-surface-variant hover:bg-surface-container-low'}`}>
                    <input type="radio" name="mode" value="wake" checked={mode === 'wake'} onChange={() => { setMode('wake'); setResult(null); }} className="hidden" />
                    <span className="material-symbols-outlined text-[20px]">alarm_on</span>
                    Saya harus bangun jam...
                  </label>
                  <label className={`flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${mode === 'sleep' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold' : 'border-surface-container text-on-surface-variant hover:bg-surface-container-low'}`}>
                    <input type="radio" name="mode" value="sleep" checked={mode === 'sleep'} onChange={() => { setMode('sleep'); setResult(null); }} className="hidden" />
                    <span className="material-symbols-outlined text-[20px]">airline_seat_individual_suite</span>
                    Saya mau tidur jam...
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="time" className="block text-sm font-bold text-on-surface">
                  {mode === 'wake' ? 'Target Jam Bangun Pagi' : 'Waktu Mulai Beranjak Tidur'}
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-surface-container-lowest border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-on-surface text-lg text-center font-bold"
                />
              </div>

              {!result ? (
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">schedule</span>
                  Hitung Waktu Ideal
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
                <h3 className="text-center text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-6">
                  {mode === 'wake' ? 'Rekomendasi Waktu Mulai Tidur' : 'Rekomendasi Waktu Pasang Alarm'}
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {result.map((item, idx) => (
                    <div key={idx} className="flex-1 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
                      <div className="text-4xl font-heading font-black text-indigo-700 mb-2">
                        {item.time}
                      </div>
                      <div className="text-sm font-bold text-indigo-900/70">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center text-sm text-on-surface-variant">
                  <p>Kalkulasi ini sudah termasuk waktu rata-rata <strong>15 menit</strong> untuk mulai terlelap.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
