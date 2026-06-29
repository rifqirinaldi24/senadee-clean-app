// ============================================================
// categoryStore.js — CRUD Kategori Artikel (localStorage)
// ============================================================

const STORAGE_KEY = 'senadee_categories_v2';

const DEFAULT_CATEGORIES = [
  { id: 1, key: 'lifestyle', name: 'Gaya Hidup', icon: '🌿', color: '#10b981', isActive: true, order: 1 },
  { id: 2, key: 'fitness', name: 'Kebugaran & Olahraga', icon: '🏃', color: '#3b82f6', isActive: true, order: 2 },
  { id: 3, key: 'beauty', name: 'Kecantikan', icon: '✨', color: '#ec4899', isActive: true, order: 3 },
  { id: 4, key: 'pregnancy', name: 'Kehamilan', icon: '🤰', color: '#f43f5e', isActive: true, order: 4 },
  { id: 5, key: 'family', name: 'Keluarga', icon: '👨‍👩‍👧‍👦', color: '#8b5cf6', isActive: true, order: 5 },
  { id: 6, key: 'health', name: 'Kesehatan', icon: '⚕️', color: '#0ea5e9', isActive: true, order: 6 },
  { id: 7, key: 'elderly', name: 'Kesehatan Lansia', icon: '👴', color: '#64748b', isActive: true, order: 7 },
  { id: 8, key: 'mental-health', name: 'Kesehatan Mental', icon: '🧠', color: '#a855f7', isActive: true, order: 8 },
  { id: 9, key: 'nutrition', name: 'Nutrisi & Diet', icon: '🥗', color: '#f59e0b', isActive: true, order: 9 },
  { id: 10, key: 'first-aid', name: 'Pertolongan Pertama', icon: '🚑', color: '#ef4444', isActive: true, order: 10 },
];

function initialize() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return [...DEFAULT_CATEGORIES];
  }
  return JSON.parse(stored);
}

function save(categories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export function getCategories() {
  return initialize().sort((a, b) => a.order - b.order);
}

export function getActiveCategories() {
  return getCategories().filter(c => c.isActive);
}

export function getCategoryByKey(key) {
  return getCategories().find(c => c.key === key);
}

export function addCategory(data) {
  const categories = initialize();
  const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
  const newCategory = {
    id: newId,
    key: data.key || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: data.name,
    icon: data.icon || '📄',
    color: data.color || '#6b7280',
    isActive: data.isActive !== undefined ? data.isActive : true,
    order: categories.length + 1,
  };
  categories.push(newCategory);
  save(categories);
  return newCategory;
}

export function updateCategory(id, updates) {
  const categories = initialize();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Kategori tidak ditemukan.');
  categories[index] = { ...categories[index], ...updates };
  save(categories);
  return categories[index];
}

export function deleteCategory(id) {
  const categories = initialize();
  const filtered = categories.filter(c => c.id !== id);
  save(filtered);
  return filtered;
}

export function toggleCategoryStatus(id) {
  const categories = initialize();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Kategori tidak ditemukan.');
  categories[index].isActive = !categories[index].isActive;
  save(categories);
  return categories[index];
}

export function resetCategories() {
  save(DEFAULT_CATEGORIES);
  return [...DEFAULT_CATEGORIES];
}
