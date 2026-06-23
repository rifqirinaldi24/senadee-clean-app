import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

export default function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [result, setResult] = useState(null);

  const calculateCalories = (e) => {
    e.preventDefault();
    if (!age || !weight || !height) return;

    const a = parseInt(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const act = parseFloat(activity);

    if (a > 0 && w > 0 && h > 0) {
      // Mifflin-St Jeor Equation for BMR
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      bmr += gender === 'male' ? 5 : -161;

      // Calculate TDEE (Total Daily Energy Expenditure)
      const tdee = bmr * act;

      // BMI Logic for Actionable Goal
      const heightInMeters = h / 100;
      const bmi = w / (heightInMeters * heightInMeters);
      
      let targetTdee = null;
      let targetText = '';
      let targetLabel = '';
      let colorClass = '';

      if (bmi < 18.5) {
        // Kurus -> Surplus
        targetTdee = Math.round(tdee) + 300;
        targetLabel = 'Target Surplus Sehat';
        targetText = `Berdasarkan BMI Anda (Kurus), target kalori harianmu untuk membangun massa tubuh secara aman adalah ${targetTdee} kkal/hari.`;
        colorClass = 'bg-blue-50 border-blue-100 text-blue-700';
      } else if (bmi >= 25) {
        // Overweight/Obesitas -> Defisit
        targetTdee = Math.round(tdee) - 500;
        targetLabel = 'Target Defisit Sehat';
        targetText = `Berdasarkan BMI Anda (Overweight/Obesitas), target kalori harianmu untuk menurunkan berat badan secara aman adalah ${targetTdee} kkal/hari.`;
        colorClass = 'bg-orange-50 border-orange-100 text-orange-700';
      } else {
        targetText = 'Berat badan Anda sudah ideal! Pertahankan asupan TDEE Anda untuk menjaga berat badan.';
        colorClass = 'bg-green-50 border-green-100 text-green-700';
      }

      setResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetText,
        targetTdee,
        targetLabel,
        colorClass
      });
    }
  };

  const resetForm = () => {
    setAge('');
    setGender('male');
    setWeight('');
    setHeight('');
    setActivity('1.2');
    setResult(null);
  };

  return (
    <>
      <SEOHead title="Kalkulator Kalori (TDEE) | Kenali Tubuhmu - Senadee" />
      
      <div className="bg-surface-container-lowest min-h-screen py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          
          <Link to="/kenali-tubuhmu" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-8">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Semua Alat
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-100 text-orange-600">
              <span className="material-symbols-outlined text-[28px]">local_fire_department</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Kalkulator Kalori</h1>
              <p className="text-on-surface-variant">Hitung Total Daily Energy Expenditure (TDEE) Anda.</p>
            </div>
          </div>

          <div className="bg-white border border-surface-container rounded-3xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={calculateCalories} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Gender */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-sm font-bold text-on-surface mb-2">Jenis Kelamin</label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${gender === 'male' ? 'border-primary bg-primary-fixed text-primary font-bold' : 'border-surface-container text-on-surface-variant hover:bg-surface-container-low'}`}>
                      <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className="hidden" />
                      <span className="material-symbols-outlined text-[20px]">man</span>
                      Laki-laki
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${gender === 'female' ? 'border-primary bg-primary-fixed text-primary font-bold' : 'border-surface-container text-on-surface-variant hover:bg-surface-container-low'}`}>
                      <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className="hidden" />
                      <span className="material-symbols-outlined text-[20px]">woman</span>
                      Perempuan
                    </label>
                  </div>
                </div>

                {/* Umur, BB, TB */}
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-bold text-on-surface">Umur (tahun)</label>
                  <input id="age" type="number" min="1" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Contoh: 25" required className="w-full px-4 py-3 bg-surface-container-lowest border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="weight" className="block text-sm font-bold text-on-surface">Berat Badan (kg)</label>
                  <input id="weight" type="number" min="1" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Contoh: 65" required className="w-full px-4 py-3 bg-surface-container-lowest border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface" />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="height" className="block text-sm font-bold text-on-surface">Tinggi Badan (cm)</label>
                  <input id="height" type="number" min="50" step="1" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Contoh: 170" required className="w-full px-4 py-3 bg-surface-container-lowest border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface" />
                </div>

                {/* Activity Level */}
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="activity" className="block text-sm font-bold text-on-surface">Tingkat Aktivitas Fisik</label>
                  <select id="activity" value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full px-4 py-3 bg-surface-container-lowest border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface">
                    <option value="1.2">Santai (Jarang / Tidak pernah olahraga)</option>
                    <option value="1.375">Ringan (Olahraga 1-3 hari / minggu)</option>
                    <option value="1.55">Sedang (Olahraga 3-5 hari / minggu)</option>
                    <option value="1.725">Berat (Olahraga 6-7 hari / minggu)</option>
                  </select>
                </div>
              </div>

              {!result ? (
                <button type="submit" className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">calculate</span>
                  Hitung Kalori
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
                <h3 className="text-center text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-8">Hasil Estimasi Harian</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-sm font-bold text-on-surface-variant mb-2">BMR (Metabolisme Dasar)</div>
                    <div className="text-3xl font-heading font-black text-on-surface flex items-baseline justify-center gap-1">
                      {result.bmr} <span className="text-base font-body text-on-surface-variant font-normal">kkal</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-2">Kalori yang terbakar walau hanya rebahan seharian.</p>
                  </div>

                  <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-6 text-center shadow-sm">
                    <div className="text-sm font-bold text-on-surface mb-2">TDEE (Kebutuhan Total)</div>
                    <div className="text-3xl font-heading font-black text-on-surface flex items-baseline justify-center gap-1">
                      {result.tdee} <span className="text-base font-body font-normal">kkal</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-2">Target kalori harian untuk mempertahankan berat badan.</p>
                  </div>
                </div>

                <div className={`border rounded-2xl p-5 text-center shadow-sm ${result.colorClass}`}>
                  <h4 className="font-bold flex items-center justify-center gap-2 mb-2">
                    <span className="material-symbols-outlined">track_changes</span>
                    Rekomendasi Target Nyata
                  </h4>
                  {result.targetTdee && (
                    <div className="text-4xl font-heading font-black mb-3">
                      {result.targetTdee} <span className="text-xl font-body font-normal opacity-80">kkal/hari</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed opacity-90 font-medium">
                    {result.targetText}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
