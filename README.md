This is a Next.js web app for AI integration testing. It can generate AI responses and search web content.

The app is built with:
- Vercel AI SDK
- Google Gemini API
- Tavily AI SDK
- Radix UI, shadcn/ui, and Tailwind CSS for responsive UI development

Currently, this project uses Gemini for model responses and Tavily for web search.

## Getting Started

Before you begin, make sure you have these API keys:
- `AI_GATEWAY_API_KEY` (Vercel AI Gateway)
- `GOOGLE_GENERATIVE_AI_API_KEY` (Google Gemini)
- `TAVILY_API_KEY` (Tavily)

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file in the project root and add:
```env
AI_GATEWAY_API_KEY=your_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
```

3. Start the development server:
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
