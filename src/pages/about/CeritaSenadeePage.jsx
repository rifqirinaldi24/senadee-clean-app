import React from 'react';
import SEOHead from '../../components/seo/SEOHead';
import AboutNav from '../../components/ui/AboutNav';

export default function CeritaSenadeePage() {
  return (
    <>
      <SEOHead title="Cerita Senadee | Tentang Kita" />

      {/* Hero Header Khusus Tentang Kita */}
      <div className="bg-surface-container-lowest pt-20 pb-16 border-b border-surface-container overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed text-primary font-bold text-sm mb-6">
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            Kenali Kami Lebih Dekat
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-on-surface mb-6 tracking-tight">
            Cerita <span className="text-primary">Senadee</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            "Rumah bagi kita yang ingin hidup dengan aman, pikiran tenang, dan melangkah lebih sehat."
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest min-h-screen">
        {/* Navigasi Pil (AboutNav) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutNav />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <main className="w-full">
            <section className="mb-20">
              
              {/* Blok 1: Teks Kiri, Gambar Kanan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
                <div className="order-2 md:order-1 space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-heading font-black text-on-surface mb-6">Awal Mula Senadee</h2>
                  <p className="text-xl text-on-surface-variant leading-relaxed">
                    Semuanya berawal dari satu keresahan: mengapa mencari informasi kesehatan di internet justru sering berujung pada kepanikan?
                  </p>
                  <p className="text-xl text-on-surface-variant leading-relaxed">
                    Kami tahu rasanya terbangun jam 2 pagi, menebak-nebak gejala sakit ringan, dan disesatkan oleh lautan informasi digital yang tidak tervalidasi. Dari sana, kami bertekad bahwa pencarian informasi medis seharusnya membawa ketenangan, bukan ketakutan.
                  </p>
                </div>
                <div className="order-1 md:order-2 aspect-[4/3] bg-primary-fixed rounded-[2rem] flex items-center justify-center overflow-hidden shadow-sm relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="material-symbols-outlined text-[120px] text-primary/40 transform group-hover:scale-110 transition-transform duration-500">vital_signs</span>
                </div>
              </div>

              {/* Blok 2: Gambar Kiri, Teks Kanan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
                <div className="aspect-[4/3] bg-secondary-container rounded-[2rem] flex items-center justify-center overflow-hidden shadow-sm relative group">
                  <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="material-symbols-outlined text-[120px] text-secondary/40 transform group-hover:scale-110 transition-transform duration-500">volunteer_activism</span>
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-heading font-black text-on-surface mb-6">Ekosistem Preventif</h2>
                  <p className="text-xl text-on-surface-variant leading-relaxed">
                    Oleh karena itu, kami menolak sekadar menjadi portal artikel. Senadee hadir sebagai sebuah ekosistem preventif yang memadukan kecepatan teknologi cerdas dengan empati dan validasi ketat dari tenaga medis profesional.
                  </p>
                  <p className="text-xl text-on-surface-variant leading-relaxed font-medium">
                    Dari bacaan terpercaya hingga alat ukur interaktif—semuanya dirancang agar kamu bisa merawat tubuh sama nyamannya dengan menyeduh secangkir kopi di pagi hari. Karena di rumah ini, kamu tidak berjuang sendirian.
                  </p>
                </div>
              </div>

              {/* Blok 3: Quote Box (Lebih kecil dan elegan) */}
              <div className="max-w-3xl mx-auto bg-surface-container-lowest border border-surface-container rounded-[1.5rem] p-8 md:p-10 shadow-sm text-center relative overflow-hidden group mt-12 hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm mb-4">
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    Catatan dari Nadiku
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed text-on-surface-variant italic font-medium">
                    "Di era sekarang, mencari informasi kesehatan lewat AI memang terasa mudah. Namun, apakah bisa sepenuhnya kita percaya? Belum tentu. Senadee hadir bukan untuk sekadar menjadi mesin pintar yang dingin. Kami ada untuk mengembalikan sebuah rasa yang mulai hilang di era digital: <span className="text-primary font-bold">Kepercayaan</span>. Karena hanya dengan ketulusan itulah, kita semua bisa kembali merasa aman."
                  </p>
                </div>
              </div>

            </section>
          </main>
          
        </div>
      </div>
    </>
  );
}
