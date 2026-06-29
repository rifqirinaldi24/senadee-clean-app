import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getHomepageLayout, saveHomepageLayout, resetHomepageLayout } from '../../data/homeStore';

// A Sortable Item component
function SortableSectionItem({ section, onUpdateConfig, onToggleVisibility }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const renderConfigForm = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-3 mt-4 border-t border-surface-container-low pt-4">
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1">Judul Utama</label>
              <input
                type="text"
                value={section.config.title}
                onChange={(e) => onUpdateConfig(section.id, { ...section.config, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-surface-container rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1">Teks Highlight (Berwarna)</label>
              <input
                type="text"
                value={section.config.titleHighlight || ''}
                onChange={(e) => onUpdateConfig(section.id, { ...section.config, titleHighlight: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-surface-container rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1">Sub Judul</label>
              <textarea
                value={section.config.subtitle}
                onChange={(e) => onUpdateConfig(section.id, { ...section.config, subtitle: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-surface-container rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1">Teks Trust Badge</label>
              <input
                type="text"
                value={section.config.trustBadge}
                onChange={(e) => onUpdateConfig(section.id, { ...section.config, trustBadge: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-surface-container rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>
        );
      case 'pillars':
      case 'featured':
        return (
          <div className="space-y-3 mt-4 border-t border-surface-container-low pt-4">
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1">Judul Section</label>
              <input
                type="text"
                value={section.config.title}
                onChange={(e) => onUpdateConfig(section.id, { ...section.config, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-surface-container rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            {section.config.subtitle !== undefined && (
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">Sub Judul</label>
                <input
                  type="text"
                  value={section.config.subtitle}
                  onChange={(e) => onUpdateConfig(section.id, { ...section.config, subtitle: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-surface-container rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            )}
          </div>
        );
      case 'all-articles':
        return (
          <div className="space-y-3 mt-4 border-t border-surface-container-low pt-4">
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1">Judul (Normal)</label>
              <input
                type="text"
                value={section.config.titleNormal}
                onChange={(e) => onUpdateConfig(section.id, { ...section.config, titleNormal: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-surface-container rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-on-surface-variant mb-1">Judul (Saat Filter Aktif)</label>
              <input
                type="text"
                value={section.config.titleFiltered}
                onChange={(e) => onUpdateConfig(section.id, { ...section.config, titleFiltered: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-surface-container rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>
        );
      case 'widget':
        return (
          <div className="space-y-3 mt-4 border-t border-surface-container-low pt-4">
            <p className="text-sm text-on-surface-variant italic">Widget ini tidak memiliki pengaturan teks kustom.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-surface border rounded-xl mb-4 overflow-hidden shadow-sm transition-all ${isDragging ? 'shadow-lg border-primary opacity-90' : 'border-surface-container'}`}
    >
      {/* Header bar (Draggable area) */}
      <div className="flex items-center justify-between p-4 bg-surface-container-lowest border-b border-surface-container-low">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:text-primary text-on-surface-variant active:cursor-grabbing p-1"
            title="Tahan dan geser untuk memindahkan"
          >
            <span className="material-symbols-outlined">drag_indicator</span>
          </div>
          <div>
            <h3 className="font-bold text-on-surface capitalize">Section: {section.type.replace('-', ' ')}</h3>
            <p className="text-xs text-on-surface-variant">ID: {section.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-on-surface-variant">
            {section.isVisible ? 'Terlihat' : 'Disembunyikan'}
          </span>
          <button
            onClick={() => onToggleVisibility(section.id)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${section.isVisible ? 'bg-primary' : 'bg-surface-container-highest'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${section.isVisible ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 bg-surface">
        {renderConfigForm()}
      </div>
    </div>
  );
}

export default function HomePageEditor() {
  const [layout, setLayout] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLayout(getHomepageLayout());
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLayout((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleUpdateConfig = (id, newConfig) => {
    setLayout(items => items.map(item => 
      item.id === id ? { ...item, config: newConfig } : item
    ));
  };

  const handleToggleVisibility = (id) => {
    setLayout(items => items.map(item => 
      item.id === id ? { ...item, isVisible: !item.isVisible } : item
    ));
  };

  const handleSave = () => {
    saveHomepageLayout(layout);
    setIsSaved(true);
    
    // Broadcast custom event so other tabs/components update immediately
    window.dispatchEvent(new Event('homepage-layout-updated'));

    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Yakin ingin mereset layout ke pengaturan awal? Semua perubahan akan hilang.")) {
      const defaultLayout = resetHomepageLayout();
      setLayout(defaultLayout);
      window.dispatchEvent(new Event('homepage-layout-updated'));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface font-heading">Homepage Editor</h1>
          <p className="text-on-surface-variant">Atur urutan dan teks bagian-bagian di Halaman Beranda</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-error bg-error-container/20 rounded-md hover:bg-error-container transition-colors"
          >
            Reset Default
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-md hover:bg-primary/90 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            {isSaved ? 'Tersimpan!' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-6">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={layout.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="max-w-3xl mx-auto">
              {layout.map((section) => (
                <SortableSectionItem 
                  key={section.id} 
                  section={section} 
                  onUpdateConfig={handleUpdateConfig}
                  onToggleVisibility={handleToggleVisibility}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
