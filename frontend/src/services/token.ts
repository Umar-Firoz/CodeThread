let activeToken: string | null = null;

export function setAccessToken(token: string | null): void {
  activeToken = token;
}

export function getAccessToken(): string | null {
  return activeToken;
}
