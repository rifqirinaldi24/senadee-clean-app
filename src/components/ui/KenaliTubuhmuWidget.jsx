import { Link } from 'react-router-dom';

const TOOLS = [
  {
    id: 'bmi',
    title: 'Kalkulator BMI',
    desc: 'Cek apakah berat badan Anda sudah ideal.',
    icon: 'scale',
    color: 'bg-primary-container text-primary',
    path: '/kenali-tubuhmu/bmi'
  },
  {
    id: 'kalori',
    title: 'Kalkulator Kalori',
    desc: 'Hitung kebutuhan kalori harian Anda (TDEE).',
    icon: 'local_fire_department',
    color: 'bg-orange-100 text-orange-600',
    path: '/kenali-tubuhmu/kalori'
  },
  {
    id: 'tidur',
    title: 'Kalkulator Waktu Tidur',
    desc: 'Temukan waktu tidur optimal berdasarkan siklus.',
    icon: 'bedtime',
    color: 'bg-indigo-100 text-indigo-600',
    path: '/kenali-tubuhmu/tidur'
  },
  {
    id: 'air',
    title: 'Kebutuhan Air Putih',
    desc: 'Ketahui jumlah liter air minum yang pas untuk Anda.',
    icon: 'water_drop',
    color: 'bg-cyan-100 text-cyan-600',
    path: '/kenali-tubuhmu/air'
  },
  {
    id: 'stres',
    title: 'Tes Tingkat Stres',
    desc: 'Ukur beban mental Anda dengan asesmen sederhana.',
    icon: 'psychology',
    color: 'bg-rose-100 text-rose-600',
    path: '/kenali-tubuhmu/stres'
  }
];

export default function KenaliTubuhmuWidget() {
  return (
    <section className="mb-14 sm:mb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">vital_signs</span>
            Kenali Tubuhmu
          </h2>
          <p className="text-on-surface-variant">Coba 5 alat ukur kesehatan interaktif kami untuk gaya hidup yang lebih baik.</p>
        </div>
        <Link 
          to="/kenali-tubuhmu"
          className="text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          Lihat Semua Alat
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory hide-scrollbar">
        {TOOLS.map((tool) => (
          <div 
            key={tool.id} 
            className="flex-none w-[260px] sm:w-[280px] snap-start bg-surface-container-lowest border border-surface-container rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all flex flex-col h-full"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color}`}>
              <span className="material-symbols-outlined text-[24px]">{tool.icon}</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-on-surface mb-2">{tool.title}</h3>
            <p className="text-sm text-on-surface-variant mb-6 flex-grow">{tool.desc}</p>
            <Link
              to={tool.path}
              className="mt-auto w-full py-2.5 rounded-xl border border-surface-container font-label-md text-label-md font-bold text-on-surface-variant text-center hover:bg-primary-fixed hover:text-primary hover:border-primary-fixed transition-colors block"
            >
              Coba Sekarang
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
