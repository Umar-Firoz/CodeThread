import React from 'react';
import { Home, Code, Users, Files, Settings, Logout } from '../common/Icons';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'my-reviews', label: 'My Review Sessions', icon: Code },
    { id: 'shared-with-me', label: 'Shared With Me', icon: Users },
    { id: 'documents', label: 'Documents', icon: Files },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed top-14 bottom-0 left-0 w-60 bg-black border-r border-zinc-900 z-35 hidden md:flex flex-col justify-between py-4 select-none">
      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-950/20 text-blue-400 border border-blue-900/30 shadow-[0_0_12px_rgba(59,130,246,0.05)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-blue-400' : 'text-zinc-500'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-3 border-t border-zinc-900/60 pt-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/10 border border-transparent hover:border-red-900/20 transition-all duration-200 cursor-pointer"
        >
          <Logout size={16} className="text-red-400/80" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
