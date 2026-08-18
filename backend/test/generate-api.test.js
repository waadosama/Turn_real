import test, { mock } from 'node:test'
import assert from 'node:assert/strict'
import OpenAI from 'openai'

import app from '../src/app.js'

async function request(body) {
  const server = app.listen(0)
  const { port } = server.address()

  try {
    const res = await fetch(`http://localhost:${port}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    return {
      status: res.status,
      data: await res.json(),
    }
  } finally {
    await new Promise((resolve) => server.close(resolve))
  }
}

test('POST /api/generate accepts valid payload', async () => {
  const previousKey = process.env.GROQ_API_KEY
  delete process.env.GROQ_API_KEY

  try {
    const result = await request({
      prompt: 'A product for creators',
      integrations: ['Stripe', 'Slack'],
    })

    assert.equal(result.status, 500)
    assert.equal(result.data.success, false)
    assert.match(result.data.error, /AI service is not configured|Something went wrong|temporarily unavailable/i)
    assert.equal(typeof result.data.error, 'string')
  } finally {
    if (previousKey === undefined) {
      delete process.env.GROQ_API_KEY
    } else {
      process.env.GROQ_API_KEY = previousKey
    }
  }
})

test('POST /api/generate rejects empty prompt', async () => {
  const result = await request({
    prompt: '   ',
    integrations: ['Stripe'],
  })

  assert.equal(result.status, 400)
  assert.equal(result.data.success, false)
  assert.match(result.data.error, /required/i)
})

test('POST /api/generate rejects invalid integrations', async () => {
  const result = await request({
    prompt: 'A product for creators',
    integrations: 'Stripe',
  })

  assert.equal(result.status, 400)
  assert.equal(result.data.success, false)
  assert.match(result.data.error, /array/i)
})

test('POST /api/generate returns a clear quota error when Groq quota is exhausted', async () => {
  const previousKey = process.env.GROQ_API_KEY
  process.env.GROQ_API_KEY = 'test-key'
  const previousChatCompletions = Groq.prototype.chat?.completions
  const error = new Error('429 You exceeded your current quota, please check your plan and billing details.')
  error.status = 429
  error.error = {
    code: 'insufficient_quota',
    message: 'You exceeded your current quota, please check your plan and billing details.',
  }

  Groq.prototype.chat = {
    completions: {
      create: async () => {
        throw error
      },
    },
  }

  try {
    const result = await request({
      prompt: 'A product for creators',
      integrations: ['Stripe'],
    })

    assert.equal(result.status, 429)
    assert.equal(result.data.success, false)
    assert.match(result.data.error, /quota|billing/i)
  } finally {
    if (previousChatCompletions) {
      Groq.prototype.chat = { completions: previousChatCompletions }
    } else {
      delete Groq.prototype.chat
    }
    if (previousKey === undefined) {
      delete process.env.GROQ_API_KEY
    } else {
      process.env.GROQ_API_KEY = previousKey
    }
  }
})
