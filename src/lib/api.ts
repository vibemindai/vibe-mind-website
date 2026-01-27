// Shared base URL
export const API_BASE_URL = "https://vmpc01.vibemind.in";

// Endpoints
export const CHAT_API_ENDPOINT = `${API_BASE_URL}/ass/api/generate`;
export const CONTACT_API_ENDPOINT = `${API_BASE_URL}/api/contact`;

// Storage keys
const SESSION_ID_KEY = "chat-session-id";
const CLIENT_ID_KEY = "vibemind-client-id";

// Default client ID for new users
const DEFAULT_CLIENT_ID = "dabdf41d-5b06-4807-b262-f84119dec26e";

/**
 * Get or create a session ID (stored in sessionStorage)
 * Session IDs persist for the browser tab session
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Get or create a persistent client ID (stored in localStorage)
 * Client IDs persist across browser sessions
 */
export function getClientId(): string {
  if (typeof window === "undefined") return "";

  let clientId = localStorage.getItem(CLIENT_ID_KEY);
  if (!clientId) {
    clientId = DEFAULT_CLIENT_ID;
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }
  return clientId;
}

/**
 * Submit a contact request (email or phone)
 */
export async function submitContact(contact: string): Promise<Response> {
  return fetch(CONTACT_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-session-id": getSessionId(),
      "x-client-id": getClientId(),
    },
    body: JSON.stringify({ contact }),
  });
}
