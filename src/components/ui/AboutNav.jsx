import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AboutNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      id: 'cerita',
      path: '/tentang-kita/cerita-senadee',
      label: 'Cerita Senadee',
      icon: 'favorite',
      color: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
      activeColor: 'bg-pink-500 text-white border-transparent'
    },
    {
      id: 'tim',
      path: '/tentang-kita/tim-pioneers',
      label: 'Tim Pioneers',
      icon: 'group',
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      activeColor: 'bg-blue-500 text-white border-transparent'
    },
    {
      id: 'kemitraan',
      path: '/tentang-kita/kemitraan',
      label: 'Peluang Kolaborasi',
      icon: 'handshake',
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
      activeColor: 'bg-amber-500 text-white border-transparent'
    }
  ];

  return (
    <div className="w-full flex justify-center py-8">
      <nav className="flex flex-wrap items-center justify-center gap-3">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 border shadow-sm ${
                isActive ? `${item.activeColor} shadow-md scale-105` : item.color
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
