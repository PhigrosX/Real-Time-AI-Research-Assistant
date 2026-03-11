A modern AI chat application built with Next.js, featuring real-time streaming responses and agentic web search.

## Core Features

- **App Router** — Built on Next.js App Router with a dedicated API route (`/api/chat`) handling all model interactions server-side.
- **Streaming Output** — Uses `streamText` from the Vercel AI SDK to stream model responses token-by-token in real time, delivering a fluid chat experience.
- **Vercel AI Gateway** — Model requests are routed through Vercel AI Gateway (`AI_GATEWAY_API_KEY`), enabling centralized API key management, usage monitoring, and provider abstraction.
- **Agentic Web Search (Tool Calling)** — Integrates Tavily AI SDK as a callable tool. The model autonomously decides when to invoke a web search, retrieves real-time results, and incorporates them into its response — without manual intervention.
- **Responsive UI** — Built with Radix UI, shadcn/ui, and Tailwind CSS, supporting both mobile and desktop layouts.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| AI SDK | Vercel AI SDK |
| Model | Google Gemini 2.5 Flash |
| Web Search | Tavily AI SDK |
| UI | Radix UI, shadcn/ui, Tailwind CSS |

<img src="public/screenshot.png" alt="App Screenshot" height=500/>

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
