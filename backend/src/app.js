import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { generateBlueprintFromAI } from '../services/aiService.js'

dotenv.config()

export async function generateBlueprint({ prompt, integrations = [] }) {
  return generateBlueprintFromAI({ prompt, integrations })
}

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, integrations } = req.body || {}

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required and cannot be empty.',
      })
    }

    if (!Array.isArray(integrations)) {
      return res.status(400).json({
        success: false,
        error: 'Integrations must be an array.',
      })
    }

    const response = await generateBlueprintFromAI({ prompt, integrations })

    return res.status(200).json({
      success: true,
      response,
    })
  } catch (error) {
    const message = error?.message || 'Unable to generate your blueprint right now.'
    const errorCode = error?.error?.code || error?.code || ''
    const statusCode = Number(error?.status || error?.statusCode || 0)

    if (message.includes('API key')) {
      return res.status(500).json({
        success: false,
        error: 'AI service is not configured. Add GROQ_API_KEY to backend/.env.',
      })
    }

    if (statusCode === 401 || /invalid.*key|unauthorized|authentication/i.test(message) || /invalid.*key|unauthorized|authentication/i.test(errorCode)) {
      return res.status(401).json({
        success: false,
        error: 'Groq API key is invalid or expired. Update GROQ_API_KEY in backend/.env and try again.',
      })
    }

    if (statusCode === 429 || /quota|billing|insufficient_quota/i.test(message) || /quota|billing|insufficient_quota/i.test(errorCode)) {
      return res.status(429).json({
        success: false,
        error: 'Groq quota is exhausted. Please check your billing and API plan, then try again.',
      })
    }

    if (message.includes('Groq') || message.includes('request')) {
      return res.status(502).json({
        success: false,
        error: 'The AI service is temporarily unavailable. Please try again in a moment.',
      })
    }

    return res.status(500).json({
      success: false,
      error: 'Something went wrong while generating your blueprint. Please try again.',
    })
  }
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found.',
  })
})

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  return res.status(500).json({
    success: false,
    error: 'Something went wrong while generating your blueprint. Please try again.',
  })
})

export default app
