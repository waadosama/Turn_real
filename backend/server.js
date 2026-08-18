import app, { generateBlueprint } from './src/app.js'

export { generateBlueprint }

const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`كون backend running on http://localhost:${PORT}`)
  })
}

export default app
