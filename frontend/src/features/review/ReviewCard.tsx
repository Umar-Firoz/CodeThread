import React from 'react';
import { ReviewSession } from './types';
import { Card, CardContent } from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Users, Files, ArrowRight } from '../../components/common/Icons';

interface ReviewCardProps {
  session: ReviewSession;
  onOpen: (session: ReviewSession) => void;
}

export default function ReviewCard({ session, onOpen }: ReviewCardProps) {
  const isOwner = session.owner === 'developer@codethread.io' || session.owner === 'umarfiroz@gmail.com';
  const ownerInitials = session.owner.split('@')[0].substring(0, 2).toUpperCase() || 'CT';

  return (
    <Card hoverGlow className="flex flex-col h-full bg-[#0a0a0c]/60 hover:translate-y-[-2px] duration-250 select-none">
      <CardContent className="flex-1 flex flex-col justify-between p-5 gap-4">
        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-zinc-100 truncate group-hover:text-blue-400 transition-colors">
              {session.name}
            </h4>
            <Badge variant={session.status === 'active' ? 'active' : 'archived'}>
              {session.status === 'active' ? 'Active' : 'Archived'}
            </Badge>
          </div>
          
          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {session.description}
          </p>
        </div>

        {/* Middle Stats Row */}
        <div className="flex items-center gap-4 text-zinc-500 py-1 border-y border-zinc-900/40">
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <Users size={13} className="text-zinc-600" />
            <span>{session.membersCount} members</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <Files size={13} className="text-zinc-600" />
            <span>{session.documentsCount} documents</span>
          </div>
        </div>

        {/* Bottom Metadata & Button Row */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          {/* Owner details */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center text-[9px] font-bold">
              {ownerInitials}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-medium leading-none">
                {isOwner ? 'You' : session.owner.split('@')[0]}
              </span>
              <span className="text-[9px] text-zinc-600 leading-none mt-1">
                {session.createdDate}
              </span>
            </div>
          </div>

          {/* Action Trigger */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpen(session)}
            className="group/btn px-2.5 py-1 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-950/20 border border-transparent hover:border-blue-900/30 font-medium select-none"
          >
            <span>Open</span>
            <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
