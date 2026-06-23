import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

export default function BmiCalculator() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) return;

    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let category = '';
      let colorClass = '';
      let bannerColor = '';
      let riskText = '';
      let riskColorClass = '';

      if (bmi < 18.5) {
        category = 'Kurus';
        colorClass = 'bg-blue-500';
        bannerColor = 'from-blue-600 to-blue-400';
        riskText = 'Risiko Kesehatan: Kekurangan gizi, Osteoporosis, Penurunan imunitas, dan Anemia.';
        riskColorClass = 'text-blue-700 bg-blue-50 border-blue-200';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Ideal';
        colorClass = 'bg-green-500';
        bannerColor = 'from-green-600 to-green-400';
        riskText = 'Risiko Kesehatan: Rendah. Pertahankan gaya hidup sehatmu untuk mencegah penyakit metabolik di masa depan.';
        riskColorClass = 'text-green-700 bg-green-50 border-green-200';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Berlebih';
        colorClass = 'bg-orange-500';
        bannerColor = 'from-orange-600 to-orange-400';
        riskText = 'Risiko Kesehatan (Menengah): Rentan terhadap Hipertensi, Kolesterol tinggi, dan awal mula Diabetes Tipe 2.';
        riskColorClass = 'text-orange-700 bg-orange-50 border-orange-200';
      } else {
        category = 'Obesitas';
        colorClass = 'bg-red-500';
        bannerColor = 'from-red-600 to-red-400';
        riskText = 'Risiko Kesehatan (Tinggi): Sangat berisiko terkena Penyakit Jantung Koroner, Stroke, Diabetes Tipe 2, dan Sleep Apnea.';
        riskColorClass = 'text-red-700 bg-red-50 border-red-200';
      }

      const beratMin = 18.5 * (h * h);
      const beratMax = 24.9 * (h * h);
      let actionText = '';

      if (bmi < 18.5) {
        const selisih = beratMin - w;
        actionText = `Untuk mencapai berat badan ideal, target sehatmu adalah menaikkan minimal ${selisih.toFixed(1)} kg agar mencapai berat aman ${beratMin.toFixed(1)} kg.`;
      } else if (bmi >= 25) {
        const selisih = w - beratMax;
        actionText = `Untuk meminimalisir risiko penyakit, target sehatmu adalah menurunkan minimal ${selisih.toFixed(1)} kg agar mencapai berat aman ${beratMax.toFixed(1)} kg.`;
      } else {
        actionText = `Keren! Berat badanmu sudah ideal. Tetap pertahankan beratmu di rentang ${beratMin.toFixed(1)} kg sampai ${beratMax.toFixed(1)} kg.`;
      }

      // Hitung posisi persentase pointer di skala (Asumsi range BMI 15 sampai 40)
      const minBmiScale = 15;
      const maxBmiScale = 40;
      const range = maxBmiScale - minBmiScale;
      let pointerPosition = ((bmi - minBmiScale) / range) * 100;
      pointerPosition = Math.max(0, Math.min(100, pointerPosition)); // Cap between 0 and 100

      setResult({
        score: bmi.toFixed(1),
        category,
        colorClass,
        bannerColor,
        riskText,
        riskColorClass,
        actionText,
        pointerPosition,
        input: { gender, weight, height }
      });
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <>
      <SEOHead title="Kalkulator BMI | Kenali Tubuhmu - Senadee" />
      
      <div className="bg-surface-container-lowest min-h-screen py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb & Header */}
          <Link to="/kenali-tubuhmu" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-8">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Semua Alat
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary-container text-primary">
              <span className="material-symbols-outlined text-[28px]">scale</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Kalkulator BMI</h1>
              <p className="text-on-surface-variant">Ketahui apakah berat badan Anda sudah ideal (Standar WHO/Kemenkes).</p>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="bg-white border border-surface-container rounded-3xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={calculateBMI} className="space-y-6">
              
              {/* Gender Selection */}
              <div className="space-y-2">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="height" className="block text-sm font-bold text-on-surface">Tinggi Badan (cm)</label>
                  <input
                    id="height"
                    type="number"
                    min="50"
                    step="1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Contoh: 170"
                    required
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="weight" className="block text-sm font-bold text-on-surface">Berat Badan (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    min="1"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Contoh: 65"
                    required
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface"
                  />
                </div>
              </div>

              {!result ? (
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">calculate</span>
                  Hitung BMI
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full py-4 bg-surface-container-low text-on-surface-variant rounded-xl font-bold hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">refresh</span>
                  Hitung Ulang
                </button>
              )}
            </form>

            {/* Result Area */}
            {result && (
              <div className="mt-8 pt-8 border-t border-surface-container animate-fade-in">
                
                {/* Summary Bar */}
                <div className="flex justify-center items-center gap-6 mb-6 pb-6 border-b border-surface-container text-on-surface-variant font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px] text-primary">{result.input.gender === 'male' ? 'man' : 'woman'}</span>
                    {result.input.gender === 'male' ? 'Laki-Laki' : 'Perempuan'}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px] text-primary">height</span>
                    {result.input.height} cm
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px] text-primary">monitor_weight</span>
                    {result.input.weight} kg
                  </div>
                </div>

                {/* Hero Banner Kategori */}
                <div className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 mb-8 text-white bg-gradient-to-br ${result.bannerColor} shadow-lg flex items-center justify-between`}>
                  <div className="relative z-10">
                    <div className="text-white/80 font-medium mb-1 text-sm sm:text-base">Berat Badan di Kategori</div>
                    <div className="text-4xl sm:text-5xl font-heading font-black tracking-tight">{result.category}</div>
                  </div>
                  <span className="material-symbols-outlined text-[100px] sm:text-[140px] absolute right-[-10px] bottom-[-20px] text-white/20 transform -rotate-12 select-none">
                    {result.input.gender === 'male' ? 'boy' : 'girl'}
                  </span>
                </div>

                {/* Visual Scale Chart */}
                <div className="mb-14 relative px-2">
                  <div className="h-10 sm:h-12 w-full flex rounded-xl overflow-hidden shadow-sm relative">
                    <div className="bg-blue-500 h-full flex items-center justify-center text-white font-bold text-xs sm:text-sm" style={{ width: '14%' }}>
                      <span className="hidden sm:inline">Kurus</span>
                    </div>
                    <div className="bg-green-500 h-full flex items-center justify-center text-white font-bold text-xs sm:text-sm" style={{ width: '26%' }}>
                      Ideal
                    </div>
                    <div className="bg-orange-500 h-full flex items-center justify-center text-white font-bold text-xs sm:text-sm" style={{ width: '20%' }}>
                      Berlebih
                    </div>
                    <div className="bg-red-500 h-full flex items-center justify-center text-white font-bold text-xs sm:text-sm" style={{ width: '40%' }}>
                      Obesitas
                    </div>
                  </div>

                  {/* Pointer / Marker */}
                  <div 
                    className="absolute top-full mt-1 flex flex-col items-center transform -translate-x-1/2 transition-all duration-1000 ease-out"
                    style={{ left: `${result.pointerPosition}%` }}
                  >
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-800"></div>
                    <div className={`mt-0.5 px-3 py-1 bg-gray-800 text-white rounded-md font-bold shadow-md text-sm`}>
                      {result.score}
                    </div>
                  </div>
                </div>

                {/* Risiko & Target Info */}
                <div className="space-y-4">
                  {result.riskText && (
                    <div className={`px-5 py-4 border rounded-2xl text-sm font-medium leading-relaxed ${result.riskColorClass}`}>
                      {result.riskText}
                    </div>
                  )}

                  {result.actionText && (
                    <div className="bg-primary-fixed/30 border border-primary-container rounded-2xl p-5 text-center shadow-sm">
                      <h4 className="font-bold text-on-surface flex items-center justify-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">flag</span>
                        Target Realistis
                      </h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                        {result.actionText}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 bg-surface-container-lowest border border-surface-container rounded-xl p-5 text-sm text-on-surface-variant leading-relaxed">
                  <strong className="text-on-surface">Catatan Medis:</strong> Indeks Massa Tubuh (BMI) adalah metrik dasar. Hasil ini tidak mengukur persentase lemak tubuh secara spesifik dan mungkin kurang akurat bagi atlet berotot besar atau ibu hamil.
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
