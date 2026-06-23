import { Link } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';

const TOOLS = [
  {
    id: 'bmi',
    title: 'Kalkulator BMI',
    desc: 'Cek apakah berat badan Anda sudah ideal berdasarkan standar WHO/Kemenkes.',
    icon: 'scale',
    color: 'bg-primary-container text-primary',
    path: '/kenali-tubuhmu/bmi'
  },
  {
    id: 'kalori',
    title: 'Kalkulator Kalori (TDEE)',
    desc: 'Hitung estimasi kebutuhan kalori harian Anda berdasarkan tingkat aktivitas fisik.',
    icon: 'local_fire_department',
    color: 'bg-orange-100 text-orange-600',
    path: '/kenali-tubuhmu/kalori'
  },
  {
    id: 'tidur',
    title: 'Kalkulator Waktu Tidur',
    desc: 'Temukan waktu tidur atau bangun optimal Anda berdasarkan siklus tidur 90 menit (REM).',
    icon: 'bedtime',
    color: 'bg-indigo-100 text-indigo-600',
    path: '/kenali-tubuhmu/tidur'
  },
  {
    id: 'air',
    title: 'Kebutuhan Air Putih',
    desc: 'Ketahui jumlah liter air minum yang pas untuk hidrasi tubuh Anda setiap hari.',
    icon: 'water_drop',
    color: 'bg-cyan-100 text-cyan-600',
    path: '/kenali-tubuhmu/air'
  },
  {
    id: 'stres',
    title: 'Tes Tingkat Stres',
    desc: 'Ukur beban mental Anda dengan asesmen sederhana untuk mencegah burnout.',
    icon: 'psychology',
    color: 'bg-rose-100 text-rose-600',
    path: '/kenali-tubuhmu/stres'
  }
];

export default function ToolsIndexPage() {
  return (
    <>
      <SEOHead 
        title="Kenali Tubuhmu - Alat Kesehatan Interaktif | Senadee" 
        description="Gunakan 5 alat ukur kesehatan interaktif kami untuk gaya hidup yang lebih baik. Kalkulator BMI, Kalori, Waktu Tidur, Kebutuhan Air, dan Tes Tingkat Stres."
      />
      
      <div className="bg-surface-container-lowest min-h-screen pb-20">
        {/* Header Section */}
        <section className="bg-surface-container-low pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-surface-container">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-container text-primary font-bold text-sm mb-6">
              <span className="material-symbols-outlined text-[18px]">vital_signs</span>
              Clinical Clarity Tools
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-on-surface mb-6 leading-tight">
              Kenali Tubuhmu,<br className="hidden sm:block" />
              Pahami Kebutuhanmu
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Gunakan 5 alat ukur kesehatan interaktif kami untuk membantu Anda membuat keputusan gaya hidup yang lebih sehat dan terukur setiap harinya.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <Link 
                key={tool.id} 
                to={tool.path}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-surface-container shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col h-full"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-symbols-outlined text-[28px]">{tool.icon}</span>
                </div>
                <h2 className="font-heading font-bold text-xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {tool.title}
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow">
                  {tool.desc}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold mt-auto group-hover:translate-x-1 transition-transform">
                  Coba Sekarang
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
