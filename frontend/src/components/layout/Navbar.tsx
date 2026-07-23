import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Logout, Code, Settings } from '../common/Icons';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  userEmail?: string;
  onLogout: () => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  userEmail = 'developer@codethread.io',
  onLogout,
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const notifications = [
    { id: 1, text: 'Sarah commented on index.css', time: '10m ago', unread: true },
    { id: 2, text: 'Pipeline passed for auth-middleware', time: '2h ago', unread: true },
    { id: 3, text: 'Alex requested review on websocketStore.ts', time: '5h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
  const userInitials = userEmail.split('@')[0].substring(0, 2).toUpperCase() || 'CT';

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-black/60 backdrop-blur-md border-b border-zinc-900 z-40 px-4 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5 select-none">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/10">
          <Code className="text-white" size={16} />
        </div>
        <span className="text-base font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400">
          CodeThread
        </span>
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-950/40 text-blue-400 border border-blue-900/30">
          Beta
        </span>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search review sessions... (Cmd+K)"
            className="w-full bg-zinc-900/50 border border-zinc-800/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="text-[9px] bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-800 font-sans tracking-wide">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Action Icons & User Dropdown */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserDropdown(false);
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-all cursor-pointer relative"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-black" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl shadow-black overflow-hidden z-50">
              <div className="p-3 border-b border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-300">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-blue-950 text-blue-400 border border-blue-900/30 px-1.5 py-0.5 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="divide-y divide-zinc-900 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs transition-colors hover:bg-zinc-900/30 cursor-pointer ${
                      n.unread ? 'bg-zinc-950' : 'opacity-70'
                    }`}
                  >
                    <p className="text-zinc-200 leading-normal">{n.text}</p>
                    <span className="text-[10px] text-zinc-500 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/40 hover:border-zinc-800 transition-all cursor-pointer select-none"
          >
            <div className="w-6 h-6 rounded-md bg-blue-950 text-blue-400 border border-blue-900/40 flex items-center justify-center text-[10px] font-bold">
              {userInitials}
            </div>
            <span className="text-xs font-medium text-zinc-300 max-w-[120px] truncate hidden sm:block">
              {userEmail.split('@')[0]}
            </span>
            <ChevronDown size={14} className="text-zinc-500" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl shadow-black overflow-hidden z-50 py-1 divide-y divide-zinc-900">
              <div className="p-3 text-left">
                <p className="text-xs text-zinc-400 font-medium">Signed in as</p>
                <p className="text-xs text-zinc-200 font-semibold truncate mt-0.5">{userEmail}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => setShowUserDropdown(false)}
                  className="w-full px-3 py-2 text-left text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Settings size={14} /> Account Settings
                </button>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    onLogout();
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-red-400 hover:text-red-300 hover:bg-red-950/10 flex items-center gap-2 cursor-pointer transition-colors font-medium"
                >
                  <Logout size={14} /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
