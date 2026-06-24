import React, { useState } from 'react';
import SEOHead from '../../components/seo/SEOHead';
import AboutNav from '../../components/ui/AboutNav';

// Data Anggota Tim
const TEAM_DATA = [
  {
    id: 'founder',
    name: 'Rifqi Rinaldi',
    role: 'Founder & CEO',
    icon: 'face',
    color: 'bg-primary',
    textColor: 'text-white',
    bio: [
      "Diangkat sebagai Founder dan CEO sejak awal berdirinya Senadee, Rifqi memiliki visi untuk merevolusi cara masyarakat mengonsumsi informasi kesehatan di era digital.",
      "Sebelum mendirikan Senadee, beliau telah berkecimpung di industri teknologi dan pengembangan produk, memimpin berbagai inisiatif digital yang berfokus pada user experience dan aksesibilitas platform.",
      "Beliau sangat percaya bahwa kesehatan bukanlah perjuangan yang harus dihadapi sendirian. Oleh karena itu, Senadee dibangun bukan hanya sebagai platform sepihak, tetapi sebagai ekosistem empati yang mendengarkan, merangkul, dan memvalidasi kekhawatiran penggunanya.",
      "Saat ini, Rifqi berfokus pada ekspansi kemitraan strategis dan pengembangan teknologi AI terapan di dalam ekosistem Senadee."
    ]
  },
  {
    id: 'medical',
    name: 'Dr. Sarah Nadira, Sp.PD',
    role: 'Medical Director',
    icon: 'stethoscope',
    color: 'bg-blue-600',
    textColor: 'text-white',
    bio: [
      "Dr. Sarah Nadira adalah seorang dokter spesialis penyakit dalam dengan pengalaman klinis ekstensif di berbagai rumah sakit terkemuka.",
      "Sebagai Medical Director di Senadee, beliau memegang kendali penuh dan bertanggung jawab atas validasi klinis dari setiap artikel, algoritma kalkulator, dan informasi medis yang dipublikasikan di platform ini.",
      "Fokus utama beliau adalah memastikan bahwa setiap kata yang Anda baca di Senadee aman secara medis, berbasis bukti (evidence-based), dan disampaikan dengan bahasa yang menenangkan tanpa memicu kepanikan berlebih (health anxiety).",
      "Dr. Sarah juga aktif mengadvokasi literasi kesehatan preventif melalui berbagai seminar luring maupun daring."
    ]
  },
  {
    id: 'cto',
    name: 'Bima Satria',
    role: 'Chief Technology Officer',
    icon: 'code_blocks',
    color: 'bg-purple-600',
    textColor: 'text-white',
    bio: [
      "Bima Satria adalah arsitek utama di balik kecanggihan, keamanan, dan kecepatan platform Senadee. Dengan keahlian mendalam di bidang Software Engineering dan Infrastruktur Cloud, Bima merancang kerangka kerja yang menopang seluruh fitur interaktif Senadee.",
      "Fokus utamanya adalah mengembangkan teknologi yang berpusat pada manusia (human-centric), memastikan bahwa setiap interaksi pengguna—mulai dari memuat halaman artikel hingga menghitung skor kesehatan—terasa instan dan aman secara privasi data.",
      "Di bawah kepemimpinannya, tim teknologi Senadee secara berkelanjutan melakukan inovasi sistem guna menghadapi skalabilitas pengguna masa depan."
    ]
  },
  {
    id: 'pm',
    name: 'Nadia Larasati',
    role: 'Lead Product Manager',
    icon: 'view_kanban',
    color: 'bg-orange-500',
    textColor: 'text-white',
    bio: [
      "Nadia berperan sebagai jembatan strategis antara visi perusahaan, kebutuhan esensial pengguna, dan eksekusi teknis tim engineering. Ia memastikan bahwa setiap fitur yang dirilis benar-benar memecahkan masalah (pain-points) secara efektif.",
      "Dengan insting produk yang tajam, Nadia mampu memetakan perjalanan pengguna (user journey) dari hulu ke hilir. Dari pengembangan Kalkulator BMI hingga arsitektur direktori artikel, semua dirancang berdasarkan riset mendalam di bawah arahannya.",
      "Ia selalu menjaga kompas roadmap produk Senadee agar senantiasa relevan dan memberikan nilai tambah yang nyata bagi komunitas."
    ]
  },
  {
    id: 'cco',
    name: 'Andika Pratama',
    role: 'Chief Content Officer',
    icon: 'campaign',
    color: 'bg-teal-600',
    textColor: 'text-white',
    bio: [
      "Andika mengorkestrasi seluruh denyut nadi produksi konten editorial dan kreatif di Senadee. Ia memimpin jajaran penulis, editor spesialis, dan desainer untuk menerjemahkan pedoman medis yang kaku menjadi sajian visual dan tekstual yang memikat.",
      "Tugas utamanya adalah menjaga 'Tone of Voice' Senadee agar tetap pada koridor Clinical Clarity—profesional, rapi, dapat dipercaya, namun tetap sehangat dan sedekat teman sendiri.",
      "Andika menjadi garda terdepan dalam memastikan Senadee bersih dari taktik clickbait, sensasionalisme, maupun fear-mongering yang kerap meracuni literasi kesehatan digital."
    ]
  }
];

export default function TimPioneersPage() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Fungsi untuk menutup modal
  const closeModal = () => setSelectedMember(null);

  return (
    <>
      <SEOHead title="Tim Pioneers | Senadee" />

      {/* Hero Header */}
      <div className="bg-surface-container-lowest pt-20 pb-16 border-b border-surface-container overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed text-primary font-bold text-sm mb-6">
            <span className="material-symbols-outlined text-[18px]">group</span>
            Orang-Orang Hebat di Balik Layar
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-on-surface mb-6 tracking-tight">
            Pimpinan & <span className="text-primary">Tim Pioneers</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Berdedikasi tinggi untuk memastikan setiap konten kesehatan yang kamu nikmati valid, aman, dan mudah dimengerti.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest min-h-screen relative">
        {/* Navigasi Pil (AboutNav) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutNav />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <main className="w-full">
            <section className="mb-24">
              
              {/* Grid Card Tim */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {TEAM_DATA.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="group bg-surface-container-low rounded-2xl border border-surface-container shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden text-left flex flex-col focus:outline-none focus:ring-4 focus:ring-primary/20 transform hover:-translate-y-1"
                  >
                    {/* Foto/Blok Gambar Placeholder */}
                    <div className={`w-full aspect-[4/3] ${member.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className={`material-symbols-outlined text-[80px] ${member.textColor} opacity-90 group-hover:scale-110 transition-transform duration-500`}>
                        {member.icon}
                      </span>
                    </div>
                    
                    {/* Detail Card */}
                    <div className="p-6 bg-surface-container-lowest flex-grow">
                      <h3 className="text-xl font-bold font-heading text-on-surface group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-on-surface-variant text-sm mt-1 font-medium">
                        {member.role}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

            </section>
          </main>

        </div>
      </div>

      {/* Modal Popup (Tampil jika selectedMember tidak null) */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Overlay Gelap */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={closeModal}
          ></div>
          
          {/* Box Modal */}
          <div className="relative bg-surface-container-lowest w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up">
            
            {/* Tombol Tutup Silang di Kanan Atas */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
              aria-label="Tutup"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            {/* Header Modal (Mirip Screenshot: Kiri Foto, Kanan Nama & Background Terang) */}
            <div className={`flex flex-col sm:flex-row w-full ${selectedMember.color} ${selectedMember.textColor} flex-shrink-0`}>
              {/* Foto Placeholder Area */}
              <div className="w-full sm:w-2/5 md:w-1/3 aspect-[4/3] sm:aspect-auto sm:h-auto bg-black/15 flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-[100px] opacity-80 mix-blend-overlay">
                  {selectedMember.icon}
                </span>
              </div>
              
              {/* Info Area */}
              <div className="w-full sm:w-3/5 md:w-2/3 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
                {/* Dekorasi tipis di background header */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-2 relative z-10">
                  {selectedMember.name}
                </h2>
                <p className="text-xl opacity-90 font-medium relative z-10">
                  {selectedMember.role}
                </p>
              </div>
            </div>

            {/* Body Modal (Detail Biografi) */}
            <div className="p-8 md:p-10 overflow-y-auto space-y-6 flex-grow bg-surface-container-lowest">
              {selectedMember.bio.map((paragraph, index) => (
                <p key={index} className="text-on-surface-variant leading-relaxed text-[15px] sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
