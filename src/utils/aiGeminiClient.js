// Utility to call Netlify Gemini AI function for insights
export async function getGeminiInsights({ logs, stats, cost, prompt }) {
  const res = await fetch('/.netlify/functions/ai-insights', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ logs, stats, cost, prompt })
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to get AI insights');
  }
  const data = await res.json();
  return data.text;
} 