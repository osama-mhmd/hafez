import { PostHog } from "posthog-js/react";

export function captureUTMOnce(posthog: PostHog) {
  const hasCaptured = localStorage.getItem("utm_captured");
  if (hasCaptured) return;

  const params = new URLSearchParams(window.location.search);

  const utmData: Record<string, string | null> = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };

  const hasUTM = Object.values(utmData).some((val) => val !== null);

  if (hasUTM) {
    posthog.capture("utm_captured", utmData);
    posthog.people.set(utmData);
    localStorage.setItem("utm_captured", "true");
  }
}
