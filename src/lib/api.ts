// Shared base URL
export const API_BASE_URL = "https://vmser01.vibemindsolutions.ai/web/api";

// Endpoints
export const CHAT_API_ENDPOINT = `${API_BASE_URL}/ass/api/generate`;
export const CONTACT_API_ENDPOINT = `${API_BASE_URL}/api/contact`;

// Storage keys
const SESSION_ID_KEY = "chat-session-id";
const CLIENT_ID_KEY = "vibemind-client-id";
const IP_ADDRESS_KEY = "vibemind-ip-address";

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
 * Get the user's IP address (stored in sessionStorage)
 * Fetches from external service and caches for the session
 */
export function getIpAddress(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(IP_ADDRESS_KEY) || "";
}

/**
 * Fetch and cache the user's IP address
 * Call this once on app initialization
 */
export async function fetchAndCacheIpAddress(): Promise<string> {
  if (typeof window === "undefined") return "";

  // Check if already cached
  const cached = sessionStorage.getItem(IP_ADDRESS_KEY);
  if (cached) return cached;

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (response.ok) {
      const data = await response.json();
      const ip = data.ip;
      sessionStorage.setItem(IP_ADDRESS_KEY, ip);
      return ip;
    }
  } catch {
    // Silently fail - IP address is optional
  }
  return "";
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
      "x-ipaddress": getIpAddress(),
    },
    body: JSON.stringify({ contact }),
  });
}
