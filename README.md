# كوّن

كونis a product-idea-to-blueprint app that captures a user prompt, supports multi-select integrations, and sends the request to a backend Express API that builds dynamic system prompt for GROQ_API before returning a product blueprint.

## Tech Stack

- Frontend: React + Vite + JavaScript + Tailwind CSS
- Backend: Node.js + Express + JavaScript
- AI: OpenAI via the backend only

## Project Structure

```text
stunning.so/
├── frontend/               # React frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                # Express API
│   ├── services/
│   ├── src/
│   ├── test/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```

## Setup

### 1) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Create environment files

Copy the backend example file and add your API key:

```bash
cd backend
copy .env.example .env
```

Then update `backend/.env`:

```env
PORT=3001
CLIENT_URL=http://localhost:5173
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
```

> The frontend never reads or exposes the API key.

## Run the app

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

Open the frontend at http://localhost:5173 and the backend at http://localhost:3001.

## API endpoint

### POST /api/generate

Request body:

```json
{
  "prompt": "I want to build an ecommerce product for creators",
  "integrations": ["Stripe", "Shopify"]
}
```

Successful response:

```json
{
  "success": true,
  "response": "# Product Overview\n..."
}
```

The backend validates:

- prompt exists and is not empty
- integrations is an array
- OpenAI key is configured
- AI request succeeds before returning the generated blueprint

## Dynamic system prompt behavior

The backend builds a dynamic system prompt in `backend/services/aiService.js` based on the selected integrations. This means the AI context changes when the user chooses different stacks, for example:

- Ecommerce + no integrations
- Ecommerce + Stripe + Shopify
- Ecommerce + Gmail

The selected tools are included in the system prompt so the blueprint can adapt to the intended stack without hardcoding any specific integrations into the frontend or the route logic.

## Expected user flow

1. User types a prompt.
2. User selects one or more integrations.
3. React sends `{ prompt, integrations }` to `POST /api/generate`.
4. Express validates the payload.
5. The backend sends a dynamic system prompt and the original prompt to OpenAI.
6. OpenAI returns a markdown blueprint.
7. React displays the response under "Your Product Blueprint".
8. Loading states and error states are shown throughout.

## Notes

- Mova intentionally does not connect to real Stripe, Shopify, Gmail, Slack, or Google Sheets services.
- No database is required for the current flow.
- The app is designed to keep the original Mova look and feel while supporting the full frontend-to-backend-to-AI flow.
