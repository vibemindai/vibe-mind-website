import { API_BASE_URL, getSessionId, getClientId, getIpAddress } from "@/lib/api";

export const UCP_CHECK_ENDPOINT = `${API_BASE_URL}/ass/api/ucp-check`;

export interface UCPCheckResponse {
  success: boolean;
  profile?: Record<string, unknown>;
  error?: string;
}

export async function fetchUCPProfile(storeUrl: string): Promise<UCPCheckResponse> {
  const response = await fetch(UCP_CHECK_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-session-id": getSessionId(),
      "x-client-id": getClientId(),
      "x-ipaddress": getIpAddress(),
    },
    body: JSON.stringify({ url: storeUrl }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }

  return response.json();
}
