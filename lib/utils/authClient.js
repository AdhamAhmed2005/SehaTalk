// Utility to fetch current user profile from /api/profile/me
export async function fetchCurrentUser() {
  try {
    const res = await fetch('/api/profile/me', { credentials: 'include' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
}
