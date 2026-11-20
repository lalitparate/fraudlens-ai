const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export async function getSummary() {
  const response = await fetch(`${API_BASE}/api/dashboard/summary`)
  if (!response.ok) throw new Error('Could not load dashboard summary')
  return response.json()
}

export async function analyseTransaction(payload) {
  const response = await fetch(`${API_BASE}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Transaction analysis failed')
  return response.json()
}
