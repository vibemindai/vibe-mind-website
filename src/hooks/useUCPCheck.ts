import { useState, useCallback } from "react";
import type { ValidationResult } from "@/lib/ucp/ucpTypes";
import { validateUCPProfile } from "@/lib/ucp/ucpValidator";
import { fetchUCPProfile } from "@/lib/ucp/ucpApi";

export function useUCPCheck() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkJson = useCallback((jsonString: string) => {
    setLoading(true);
    setError(null);
    try {
      const validationResult = validateUCPProfile(jsonString);
      setResult(validationResult);
    } catch (e) {
      setError((e as Error).message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkUrl = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetchUCPProfile(url);
      if (!response.success) {
        setError(response.error || "Failed to fetch UCP profile");
        return;
      }
      const jsonString = JSON.stringify(response.profile, null, 2);
      const validationResult = validateUCPProfile(jsonString);
      setResult(validationResult);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { loading, result, error, checkJson, checkUrl, reset };
}
