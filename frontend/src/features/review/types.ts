export interface ReviewSession {
  id: string;
  name: string;
  description: string;
  owner: string;
  membersCount: number;
  documentsCount: number;
  createdDate: string;
  status: 'active' | 'archived';
  code: string;
  repoUrl?: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

export interface Document {
  id: string;
  name: string;
  path: string;
  size: string;
  commentsCount: number;
}

export interface SessionStats {
  totalSessions: number;
  documentsReviewed: number;
  pendingComments: number;
  teamMembers: number;
}
