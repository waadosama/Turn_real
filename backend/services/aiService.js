import Groq from 'groq-sdk'
import dotenv from 'dotenv'

dotenv.config()

export async function generateBlueprintFromAI({ prompt, integrations = [] }) {
  const apiKey = (process.env.GROQ_API_KEY || '').trim()

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is missing. Add it to backend/.env before using the AI generator.')
  }

  const selectedIntegrations = Array.isArray(integrations) ? integrations : []
  const integrationText = selectedIntegrations.length
    ? selectedIntegrations.join(', ')
    : 'No integrations selected'

  const client = new Groq({
    apiKey,
  })

  const systemPrompt = `You are a senior product strategist and technical architect. Create a concise, clear product blueprint based on the user's idea and selected integrations.

Selected integrations: ${integrationText}

Return markdown with these sections exactly in this order:
1. Product Overview
2. Core Features
3. Suggested Screens
4. Selected Integrations
5. Integration Usage
6. Technical Architecture
7. Next Steps

Be practical, specific, and implementation-focused. Keep the output polished and business-friendly.`

  const completion = await client.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 900,
  })

  const responseText = completion?.choices?.[0]?.message?.content || ''

  if (!responseText || typeof responseText !== 'string' || !responseText.trim()) {
    throw new Error('Groq returned an empty or invalid response.')
  }

  return responseText.trim()
}
