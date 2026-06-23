import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

const QUESTIONS = [
  "Seberapa sering Anda merasa lelah secara emosional atau fisik setelah bekerja/beraktivitas seharian?",
  "Seberapa sering Anda merasa kewalahan dengan tanggung jawab yang harus diselesaikan?",
  "Seberapa sering Anda mengalami kesulitan tidur karena memikirkan masalah pekerjaan atau kehidupan?",
  "Seberapa sering Anda merasa mudah marah, tersinggung, atau kehilangan kesabaran terhadap orang di sekitar?",
  "Seberapa sering Anda merasa kehilangan motivasi atau minat pada hal-hal yang biasanya Anda nikmati?"
];

const OPTIONS = [
  { value: 1, label: 'Tidak Pernah' },
  { value: 2, label: 'Jarang' },
  { value: 3, label: 'Sering' },
  { value: 4, label: 'Sangat Sering' }
];

export default function StressTest() {
  // answers is an array of size 5, initialized with null
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [result, setResult] = useState(null);

  const handleSelect = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = (e) => {
    e.preventDefault();
    if (answers.includes(null)) {
      alert('Mohon jawab semua pertanyaan terlebih dahulu.');
      return;
    }

    const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
    
    let category = '';
    let desc = '';
    let colorClass = '';

    if (totalScore >= 5 && totalScore <= 10) {
      category = 'Stres Ringan / Aman';
      desc = 'Beban pikiran Anda masih dalam batas wajar. Lanjutkan pola hidup sehat dan manajemen waktu Anda yang sudah baik.';
      colorClass = 'bg-green-100 text-green-700 border-green-200';
    } else if (totalScore >= 11 && totalScore <= 15) {
      category = 'Stres Sedang';
      desc = 'Anda mulai merasakan tekanan. Sangat disarankan untuk mengambil jeda relaksasi, melakukan hobi, atau cuti sejenak untuk memulihkan energi mental.';
      colorClass = 'bg-orange-100 text-orange-700 border-orange-200';
    } else {
      category = 'Stres Tinggi (Waspada Burnout)';
      desc = 'Tingkat stres Anda berisiko memicu masalah kesehatan fisik dan mental (Burnout). Pertimbangkan untuk berkonsultasi dengan profesional atau psikolog.';
      colorClass = 'bg-red-100 text-red-700 border-red-200';
    }

    setResult({
      score: totalScore,
      category,
      desc,
      colorClass
    });
  };

  const resetForm = () => {
    setAnswers(Array(5).fill(null));
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead title="Tes Tingkat Stres | Kenali Tubuhmu - Senadee" />
      
      <div className="bg-surface-container-lowest min-h-screen py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <Link to="/kenali-tubuhmu" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-8">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Semua Alat
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-rose-100 text-rose-600 shrink-0">
              <span className="material-symbols-outlined text-[28px]">psychology</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">Tes Tingkat Stres</h1>
              <p className="text-on-surface-variant">Asesmen mandiri singkat untuk mengukur beban mental dan mendeteksi risiko <em>burnout</em>.</p>
            </div>
          </div>

          {!result ? (
            <form onSubmit={calculateScore} className="space-y-8">
              {QUESTIONS.map((question, qIdx) => (
                <div key={qIdx} className="bg-white border border-surface-container rounded-3xl p-6 sm:p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                  <h3 className="font-heading font-bold text-lg text-on-surface mb-6 leading-relaxed">
                    <span className="text-primary mr-2">{qIdx + 1}.</span>
                    {question}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {OPTIONS.map((opt) => (
                      <label 
                        key={opt.value}
                        className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all text-sm font-bold ${answers[qIdx] === opt.value ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-surface-container text-on-surface-variant hover:bg-surface-container-low'}`}
                      >
                        <input 
                          type="radio" 
                          name={`q-${qIdx}`} 
                          value={opt.value} 
                          checked={answers[qIdx] === opt.value} 
                          onChange={() => handleSelect(qIdx, opt.value)} 
                          className="hidden" 
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="sticky bottom-4 sm:bottom-8 z-10">
                <button 
                  type="submit" 
                  className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${answers.includes(null) ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-80' : 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-600/30 hover:shadow-rose-600/50 hover:-translate-y-1'}`}
                  disabled={answers.includes(null)}
                >
                  <span className="material-symbols-outlined">analytics</span>
                  Lihat Hasil Tes
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white border border-surface-container rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in text-center">
              <span className="material-symbols-outlined text-[64px] text-rose-600 mb-4">fact_check</span>
              <h2 className="text-2xl font-heading font-bold text-on-surface mb-8">Hasil Asesmen Anda</h2>
              
              <div className={`inline-flex flex-col items-center p-8 rounded-3xl border-2 mb-8 w-full sm:w-2/3 mx-auto ${result.colorClass}`}>
                <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Skor Total</div>
                <div className="text-6xl font-heading font-black mb-4">
                  {result.score}<span className="text-2xl opacity-50">/20</span>
                </div>
                <div className="text-xl font-bold px-4 py-1.5 bg-white/50 rounded-full">
                  {result.category}
                </div>
              </div>

              <p className="text-lg text-on-surface leading-relaxed max-w-2xl mx-auto mb-10">
                {result.desc}
              </p>

              <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-5 text-sm text-on-surface-variant mb-10 text-left">
                <strong>Disclaimer:</strong> Tes ini adalah alat skrining awal (*self-assessment*) dan bukan merupakan diagnosis medis atau psikiatris resmi. Selalu konsultasikan masalah Anda dengan ahli tenaga kesehatan mental jika diperlukan.
              </div>

              <button 
                onClick={resetForm} 
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-surface-container-low text-on-surface-variant rounded-xl font-bold hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">refresh</span>
                Ulangi Tes
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
