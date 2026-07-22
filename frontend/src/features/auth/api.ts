import { LoginCredentials, RegisterCredentials, AuthResponse } from './types';

// TODO(security): Backend server communication configured for local development on localhost:8080
const API_BASE_URL = 'http://localhost:8080'; 

export async function loginApi(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      let errorMessage = 'Login failed. Please verify your credentials.';
      try {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          errorMessage = json.message || json.error || text || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
      } catch {
        // Ignore
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    // If the backend server is not reachable, fall back to mock authentication for testing purposes.
    if (error.message && error.message.includes('Failed to fetch')) {
      console.warn('Backend server not reachable. Falling back to mock authentication.');
      return mockAuthResponse(credentials.email);
    }
    throw error;
  }
}

export async function registerApi(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      let errorMessage = 'Registration failed. Please try again.';
      try {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          errorMessage = json.message || json.error || text || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
      } catch {
        // Ignore
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    if (error.message && error.message.includes('Failed to fetch')) {
      console.warn('Backend server not reachable. Falling back to mock registration.');
      return mockAuthResponse(credentials.email);
    }
    throw error;
  }
}

function mockAuthResponse(email: string): AuthResponse {
  return {
    token: 'mock-jwt-token-xyz789',
    email: email,
  };
}
