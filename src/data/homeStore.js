const STORAGE_KEY = 'senadee_homepage_layout';

// Default layout configuration
const DEFAULT_LAYOUT = [
  {
    id: 'hero',
    type: 'hero',
    isVisible: true,
    config: {
      title: 'Pikiran Tenang, Langkah Sehat.',
      titleHighlight: 'Langkah Sehat.', 
      subtitle: 'Temukan panduan kesehatan yang valid, diverifikasi oleh tenaga medis ahli, dan mudah diterapkan dalam rutinitas Anda.',
      trustBadge: '100% Diverifikasi Tim Medis'
    }
  },
  {
    id: 'pillars',
    type: 'pillars',
    isVisible: true,
    config: {
      title: 'Jelajahi Pilar Kesehatan',
      subtitle: 'Temukan artikel berdasarkan pilar konten utama kami'
    }
  },
  {
    id: 'kenali-tubuhmu',
    type: 'widget',
    isVisible: true,
    config: {} 
  },
  {
    id: 'featured',
    type: 'featured',
    isVisible: true,
    config: {
      title: '✨ Artikel Pilihan'
    }
  },
  {
    id: 'all-articles',
    type: 'all-articles',
    isVisible: true,
    config: {
      titleNormal: '📰 Artikel Terbaru',
      titleFiltered: '📋 Hasil Filter',
      emptyMessage: 'Belum ada artikel di kategori ini.'
    }
  }
];

export const getHomepageLayout = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load homepage layout", error);
  }
  return DEFAULT_LAYOUT;
};

export const saveHomepageLayout = (layout) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    return true;
  } catch (error) {
    console.error("Failed to save homepage layout", error);
    return false;
  }
};

export const resetHomepageLayout = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_LAYOUT;
  } catch (error) {
    console.error("Failed to reset homepage layout", error);
    return DEFAULT_LAYOUT;
  }
};
