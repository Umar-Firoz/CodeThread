import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/authStore';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ReviewCard from '../features/review/ReviewCard';
import CreateReviewModal from '../features/review/CreateReviewModal';
import JoinReviewModal from '../features/review/JoinReviewModal';
import { getSessionsApi } from '../features/review/api';
import { ReviewSession, ActivityLog, Document } from '../features/review/types';
import { Code, Users, Files, MessageSquare, Activity, Folder, Plus, ArrowRight } from '../components/common/Icons';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const userEmail = user?.email || 'developer@codethread.io';
  
  // Dashboard & Layout states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState<ReviewSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  // Fetch initial sessions
  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const data = await getSessionsApi();
      setSessions(data);
    } catch (err) {
      console.error('Failed to load review sessions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Mock secondary lists
  const mockActivities: ActivityLog[] = [
    { id: 'a1', user: 'sarah.connor@codethread.io', action: 'added a comment to', target: 'authInterceptor.ts', time: '10m ago' },
    { id: 'a2', user: 'umarfiroz@gmail.com', action: 'resolved thread in', target: 'types.ts', time: '2h ago' },
    { id: 'a3', user: 'alex.p@codethread.io', action: 'joined review session', target: 'Refactor Auth Middleware', time: '4h ago' },
    { id: 'a4', user: 'developer@codethread.io', action: 'created review session', target: 'UI Upgrade for Editor Layout', time: '1d ago' },
  ];

  const mockDocuments: Document[] = [
    { id: 'd1', name: 'authStore.ts', path: 'src/store/authStore.ts', size: '2.7 KB', commentsCount: 3 },
    { id: 'd2', name: 'AppRoutes.tsx', path: 'src/routes/AppRoutes.tsx', size: '2.2 KB', commentsCount: 0 },
    { id: 'd3', name: 'api.ts', path: 'src/features/review/api.ts', size: '4.8 KB', commentsCount: 5 },
    { id: 'd4', name: 'index.css', path: 'src/index.css', size: '1.1 KB', commentsCount: 1 },
  ];

  // Callback when a session is created or joined successfully
  const handleSessionUpdate = (newSession: ReviewSession) => {
    // If the session already exists, update it (e.g. member count changed)
    setSessions((prev) => {
      const exists = prev.some((s) => s.id === newSession.id);
      if (exists) {
        return prev.map((s) => (s.id === newSession.id ? newSession : s));
      }
      return [newSession, ...prev];
    });
  };

  // Navigation filtering logic
  const filteredSessions = sessions.filter((session) => {
    // 1. Filter by navigation tab
    if (activeTab === 'my-reviews') {
      const isOwned = session.owner === userEmail || session.owner === 'umarfiroz@gmail.com';
      if (!isOwned) return false;
    } else if (activeTab === 'shared-with-me') {
      const isOwned = session.owner === userEmail || session.owner === 'umarfiroz@gmail.com';
      if (isOwned) return false;
    }

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = session.name.toLowerCase().includes(query);
      const matchDesc = session.description.toLowerCase().includes(query);
      const matchOwner = session.owner.toLowerCase().includes(query);
      return matchName || matchDesc || matchOwner;
    }

    return true;
  });

  // Calculate dynamic stats
  const totalSessionsCount = sessions.length;
  const activeSessionsCount = sessions.filter((s) => s.status === 'active').length;
  const totalDocumentsCount = sessions.reduce((acc, curr) => acc + curr.documentsCount, 0) + mockDocuments.length;
  const totalMembersCount = sessions.reduce((acc, curr) => acc + curr.membersCount, 0);

  // Stats definition
  const stats = [
    { label: 'Total Review Sessions', value: totalSessionsCount, subtext: `${activeSessionsCount} active sessions`, icon: Code, color: 'text-blue-400' },
    { label: 'Documents Reviewed', value: totalDocumentsCount, subtext: ' across all workspaces', icon: Files, color: 'text-zinc-400' },
    { label: 'Pending Comments', value: 14, subtext: '3 assigned to you', icon: MessageSquare, color: 'text-indigo-400' },
    { label: 'Team Members', value: totalMembersCount, subtext: 'active contributors', icon: Users, color: 'text-emerald-400' },
  ];

  return (
    <MainLayout
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userEmail={userEmail}
      onLogout={logout}
    >
      <div className="space-y-8 select-none">
        
        {/* Welcome Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-900/60">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
              Welcome back, {userEmail.split('@')[0]}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Collaboratively review diffs, leave comments, and sync changes with your team in real time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsJoinOpen(true)}
              className="text-xs font-semibold select-none border-zinc-800 hover:border-zinc-700/80 hover:bg-zinc-900/40 text-zinc-300"
            >
              Join Session
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="text-xs font-semibold select-none bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/10 text-white"
            >
              <Plus size={14} className="mr-1.5" />
              Create Review Session
            </Button>
          </div>
        </div>

        {/* Dynamic Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="bg-[#09090b]/40">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <Icon size={16} className={`${stat.color} opacity-70`} />
                  </div>
                  <div>
                    <span className="text-2xl font-bold tracking-tight text-zinc-100">
                      {isLoading ? '...' : stat.value}
                    </span>
                    <span className="text-[10px] text-zinc-500 block mt-1">
                      {stat.subtext}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Columns Grid: Left Main Sessions, Right Activities Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Columns - Reviews List */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-900/40">
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {activeTab === 'my-reviews'
                  ? 'My Created Sessions'
                  : activeTab === 'shared-with-me'
                  ? 'Shared Sessions'
                  : 'Recent Review Sessions'}
              </h2>
              {filteredSessions.length > 0 && (
                <span className="text-[10px] text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 font-medium">
                  {filteredSessions.length} total
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="py-20 text-center space-y-4">
                <div className="inline-block animate-spin w-6 h-6 border-2 border-zinc-700 border-t-blue-500 rounded-full" />
                <p className="text-xs text-zinc-500">Retrieving repositories and session workspaces...</p>
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="py-16 px-4 text-center rounded-xl border border-zinc-900/60 bg-zinc-950/20 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
                  <Code size={18} className="text-zinc-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-zinc-300">No review sessions found</p>
                  <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                    {searchQuery
                      ? `No results match your search "${searchQuery}". Try updating your query.`
                      : "Create your first collaborative session or join an existing workspace to get started."}
                  </p>
                </div>
                {searchQuery ? (
                  <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')} className="text-[11px] text-blue-400">
                    Clear Search
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <Button variant="outline" size="sm" onClick={() => setIsJoinOpen(true)} className="text-xs">
                      Join Session
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => setIsCreateOpen(true)} className="text-xs bg-blue-600 hover:bg-blue-500 text-white">
                      Create Session
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSessions.map((session) => (
                  <ReviewCard
                    key={session.id}
                    session={session}
                    onOpen={(s) => {
                      // Trigger visual action on opening the review session
                      alert(`Opening CodeReview workspace for session: "${s.name}" (Code: ${s.code})`);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Columns - Panels (Activities & Files) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Panel 1: Recent Activity */}
            <Card className="bg-[#09090b]/30">
              <CardHeader className="p-4 border-b border-zinc-900/60 flex items-center gap-2">
                <Activity size={14} className="text-zinc-500" />
                <CardTitle className="text-xs font-semibold text-zinc-400 uppercase tracking-wider leading-none mt-0.5">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="relative border-l border-zinc-900 pl-4 space-y-4">
                  {mockActivities.map((act) => (
                    <div key={act.id} className="relative text-xs leading-normal">
                      {/* Timeline Dot Indicator */}
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700/60" />
                      
                      <p className="text-zinc-400 text-[11px]">
                        <span className="font-semibold text-zinc-300">{act.user.split('@')[0]}</span>{' '}
                        {act.action}{' '}
                        <span className="font-mono text-[10px] text-blue-400/90 font-medium bg-blue-950/15 border border-blue-950/40 px-1 py-0.5 rounded">
                          {act.target}
                        </span>
                      </p>
                      <span className="text-[9px] text-zinc-600 block mt-1">{act.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Panel 2: Recently Opened Documents */}
            <Card className="bg-[#09090b]/30">
              <CardHeader className="p-4 border-b border-zinc-900/60 flex items-center gap-2">
                <Folder size={14} className="text-zinc-500" />
                <CardTitle className="text-xs font-semibold text-zinc-400 uppercase tracking-wider leading-none mt-0.5">
                  Recent Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-0.5">
                  {mockDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/35 transition-colors cursor-pointer group select-none"
                      onClick={() => alert(`Opening file reader for "${doc.name}"`)}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-500 group-hover:text-blue-400 transition-colors">
                          <Files size={13} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-zinc-300 truncate group-hover:text-zinc-100 transition-colors">
                            {doc.name}
                          </p>
                          <p className="text-[9px] text-zinc-500 truncate mt-0.5 font-mono">
                            {doc.path}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {doc.commentsCount > 0 && (
                          <span className="text-[9px] bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 px-1.5 py-0.5 rounded-full font-semibold">
                            {doc.commentsCount}
                          </span>
                        )}
                        <span className="text-[9px] text-zinc-600 font-mono hidden sm:block">
                          {doc.size}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

        </div>

      </div>

      {/* Modals Registration */}
      <CreateReviewModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleSessionUpdate}
      />
      
      <JoinReviewModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onSuccess={handleSessionUpdate}
      />
    </MainLayout>
  );
}
