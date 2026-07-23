import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userEmail?: string;
  onLogout: () => void;
}

export default function MainLayout({
  children,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  userEmail,
  onLogout,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased overflow-x-hidden flex flex-col">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#08080a_1px,transparent_1px),linear-gradient(to_bottom,#08080a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        userEmail={userEmail}
        onLogout={onLogout}
      />

      {/* Main Body */}
      <div className="flex flex-1 pt-14 relative z-10">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          onLogout={onLogout}
        />

        {/* Inner Content Area */}
        <main className="flex-1 md:pl-60 min-w-0 transition-all duration-200">
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
