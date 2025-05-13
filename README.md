# AI Content Co-Pilot: From Idea to Multi-Platform Publishing

## Project Vision
An AI-powered web application that assists users in generating, refining, and adapting content (e.g., blog posts, social media updates, ad copy) from a simple idea or outline. The AI agent employs a multi-step process, leveraging various tools and APIs to produce high-quality, tailored content.

## Implemented Features
- ✅ Idea input & topic definition
- ✅ Outline generation & refinement
- ✅ Content drafting (with AI-powered writing)
- ✅ Image generation (using DALL-E 3)
- ⏳ Content adaptation for multiple platforms (coming soon)
- ⏳ SEO optimization (planned)
- ⏳ Review & export options (planned)

## How to Use
1. **Start with an Idea**: Enter your content topic or idea
2. **Generate an Outline**: The AI will create a structured outline for your content
3. **Create a Draft**: Turn your outline into a complete draft article
4. **Generate an Image**: Create a custom image that matches your content

## Tech Stack
**Frontend:** Next.js (React), Tailwind CSS, Custom UI components

**Backend:** Python, FastAPI, Langchain, OpenAI

**APIs:** 
- OpenAI GPT (for text generation)
- DALL-E 3 (for image generation)

**DevOps:** Docker, Docker Compose

## Project Structure
```
ai-content-copilot/
├── backend/
│   ├── app/
│   │   ├── agents/          # AI agents for content generation
│   │   ├── schemas/         # Pydantic data models
│   │   └── main.py          # FastAPI app and endpoints
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/                 # Next.js app directory
│   ├── components/          # UI components
│   ├── lib/                 # API client and utilities
│   ├── styles/              # Global styles and Tailwind config
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Setup Instructions
1. Clone the repository
2. Create a `.env` file in the project root with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
3. Build and start the application:
   ```
   docker compose up -d
   ```
4. Access the application at http://localhost:3000

## Development
- Frontend runs on port 3000
- Backend API runs on port 8000
- Make changes to the code and rebuild with `docker compose up --build -d`
