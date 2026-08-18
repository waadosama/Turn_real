import test from 'node:test'
import assert from 'node:assert/strict'

import { generateBlueprint } from '../src/app.js'

test('generateBlueprint throws when Groq API key is missing', async () => {
  const previousKey = process.env.GROQ_API_KEY
  delete process.env.GROQ_API_KEY

  try {
    await assert.rejects(
      () => generateBlueprint({
        prompt: 'A SaaS for creators to manage content calendars',
        integrations: ['Stripe', 'Slack'],
      }),
      /GROQ_API_KEY is missing/i,
    )
  } finally {
    if (previousKey === undefined) {
      delete process.env.GROQ_API_KEY
    } else {
      process.env.GROQ_API_KEY = previousKey
    }
  }
})
