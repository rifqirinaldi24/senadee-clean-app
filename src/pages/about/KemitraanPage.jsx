import React from 'react';
import SEOHead from '../../components/seo/SEOHead';
import AboutNav from '../../components/ui/AboutNav';

export default function KemitraanPage() {
  return (
    <>
      <SEOHead title="Kemitraan | Senadee" />

      {/* Hero Header Khusus Kemitraan */}
      <div className="bg-surface-container-lowest pt-20 pb-16 border-b border-surface-container overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed text-primary font-bold text-sm mb-6">
            <span className="material-symbols-outlined text-[18px]">handshake</span>
            Peluang Kolaborasi
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-on-surface mb-8 tracking-tight">
            Mari Bertumbuh <span className="text-primary">Bersama</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            Senadee tidak akan bisa bertumbuh sendirian. Mimpi kami untuk membangun literasi kesehatan yang menenangkan hanya bisa terwujud jika kita saling bahu-membahu.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest min-h-screen">
        {/* Navigasi Pil (AboutNav) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutNav />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <main className="w-full">
            <section className="mb-20">
              
              {/* Stacked Horizontal Cards untuk menghindari layout yang sempit */}
              <div className="flex flex-col gap-8 mb-20">
                
                {/* Kartu 1: Brand & Mitra */}
                <div className="bg-surface-container-low rounded-[2rem] p-8 sm:p-10 border border-surface-container shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-8 group">
                  <div className="w-24 h-24 rounded-[1.5rem] bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:-rotate-6 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[48px]">campaign</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold font-heading text-on-surface mb-3">Brand & Mitra Komersial</h3>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Bukan sekadar tempat menempel logo. Mari berkolaborasi membuat kampanye edukatif yang jujur dan relevan untuk audiens yang benar-benar peduli dengan kesehatan mereka. Tanpa janji berlebihan, hanya solusi praktis.
                    </p>
                  </div>
                </div>

                {/* Kartu 2: Tenaga Medis */}
                <div className="bg-surface-container-low rounded-[2rem] p-8 sm:p-10 border border-surface-container shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-8 group">
                  <div className="w-24 h-24 rounded-[1.5rem] bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:-rotate-6 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[48px]">stethoscope</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold font-heading text-on-surface mb-3">Tenaga Medis & Ahli</h3>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Kami menyediakan ruang digital agar ilmu dan pengalaman praktik Anda bisa menjangkau lebih banyak orang. Mari bagikan edukasi medis yang menenangkan, mematahkan mitos, dan tanpa bumbu ketakutan.
                    </p>
                  </div>
                </div>

                {/* Kartu 3: Kreator & Komunitas */}
                <div className="bg-surface-container-low rounded-[2rem] p-8 sm:p-10 border border-surface-container shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-8 group">
                  <div className="w-24 h-24 rounded-[1.5rem] bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:-rotate-6 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[48px]">lightbulb</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold font-heading text-on-surface mb-3">Kreator & Komunitas</h3>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                      Punya ide gila untuk kampanye kesehatan, rencana acara luring, atau sekadar ingin menulis artikel ringan? Pintu Senadee selalu terbuka untuk berbagai bentuk karya kreatif yang membawa manfaat.
                    </p>
                  </div>
                </div>

              </div>

              {/* Call to Action (CTA) Minimalis & Elegan */}
              <div className="pt-20 pb-10 text-center border-t border-surface-container-low mt-10">
                <h3 className="text-3xl sm:text-4xl font-black font-heading text-on-surface mb-6">Mulai Langkah Pertamamu</h3>
                <p className="text-on-surface-variant text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                  Tertarik menjajaki peluang bersama kami? Jangan ragu untuk menyapa tim kami. Kami selalu antusias membaca setiap pesan baru yang masuk.
                </p>
                <a 
                  href="mailto:partner@senadee.id"
                  className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 text-lg w-max mx-auto"
                >
                  <span className="material-symbols-outlined text-[24px]">mail</span>
                  <span>Sapa Tim Senadee</span>
                </a>
              </div>

            </section>
          </main>

        </div>
      </div>
    </>
  );
}
