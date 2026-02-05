import { onCLS, onFCP, onLCP, onTTFB } from "web-vitals";
import type { Metric } from "web-vitals";

function sendMetric(metric: Metric) {
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }
}

export default function reportWebVitals() {
  onCLS(sendMetric);
  onFCP(sendMetric);
  onLCP(sendMetric);
  onTTFB(sendMetric);
}
