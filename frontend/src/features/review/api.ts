import api from '../../services/authInterceptor';
import { ReviewSession } from './types';

// Module-level state for mock database storage when server is offline
let mockSessions: ReviewSession[] = [
  {
    id: '1',
    name: 'Refactor Auth Middleware',
    description: 'Upgrading token validation checks and implementing in-memory storage fallback interfaces.',
    owner: 'umarfiroz@gmail.com',
    membersCount: 4,
    documentsCount: 3,
    createdDate: '2026-07-20',
    status: 'active',
    code: 'CT-8891',
    repoUrl: 'https://github.com/Umar-Firoz/CodeThread',
  },
  {
    id: '2',
    name: 'Implement WebSockets for Comments',
    description: 'Integrating Stomp/SockJS protocol connections for real-time peer comment synchronization.',
    owner: 'sarah.connor@codethread.io',
    membersCount: 3,
    documentsCount: 2,
    createdDate: '2026-07-22',
    status: 'active',
    code: 'CT-9012',
    repoUrl: 'https://github.com/Umar-Firoz/CodeThread',
  },
  {
    id: '3',
    name: 'UI Upgrade for Editor Layout',
    description: 'Polishing Monaco Editor bindings and introducing glassmorphic theme variations.',
    owner: 'developer@codethread.io',
    membersCount: 5,
    documentsCount: 7,
    createdDate: '2026-07-18',
    status: 'archived',
    code: 'CT-3081',
    repoUrl: 'https://github.com/Umar-Firoz/CodeThread',
  },
  {
    id: '4',
    name: 'Optimization of DB Queries',
    description: 'Adding indexes on comment search filters and auditing Hibernate association mappings.',
    owner: 'alex.p@codethread.io',
    membersCount: 2,
    documentsCount: 1,
    createdDate: '2026-07-23',
    status: 'active',
    code: 'CT-1092',
    repoUrl: 'https://github.com/Umar-Firoz/CodeThread',
  },
];

export async function getSessionsApi(): Promise<ReviewSession[]> {
  try {
    const response = await api.get<ReviewSession[]>('/api/reviews');
    return response.data;
  } catch (error: any) {
    console.warn('Backend /api/reviews not reachable. Falling back to in-memory mock store.');
    return [...mockSessions];
  }
}

export async function createSessionApi(sessionData: Omit<ReviewSession, 'id' | 'createdDate' | 'membersCount' | 'code' | 'status'>): Promise<ReviewSession> {
  try {
    const response = await api.post<ReviewSession>('/api/reviews', sessionData);
    return response.data;
  } catch (error: any) {
    console.warn('Backend /api/reviews not reachable. Storing session in-memory.');
    
    // Create new mock session object
    const newSession: ReviewSession = {
      ...sessionData,
      id: String(mockSessions.length + 1),
      createdDate: new Date().toISOString().split('T')[0],
      membersCount: 1,
      code: `CT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active',
    };

    mockSessions = [newSession, ...mockSessions];
    return newSession;
  }
}

export async function joinSessionApi(code: string): Promise<ReviewSession> {
  try {
    const response = await api.post<ReviewSession>(`/api/reviews/join`, { code });
    return response.data;
  } catch (error: any) {
    console.warn('Backend /api/reviews/join not reachable. Joining in-memory session.');
    
    const formattedCode = code.toUpperCase().trim();
    const session = mockSessions.find((s) => s.code === formattedCode);

    if (!session) {
      throw new Error(`Review session with code "${formattedCode}" was not found.`);
    }

    if (session.status === 'archived') {
      throw new Error('This review session has been archived and cannot be joined.');
    }

    // Increment member count locally to simulate joining
    session.membersCount += 1;
    return session;
  }
}
