# AI Content Co-Pilot: From Idea to Multi-Platform Publishing

## Project Vision
An AI-powered web application that assists users in generating, refining, and adapting content (e.g., blog posts, social media updates, ad copy) from a simple idea or outline. The AI agent employs a multi-step process, leveraging various tools and APIs to produce high-quality, tailored content.

## Implemented Features
- ✅ Idea input & topic definition
- ✅ Outline generation & refinement
- ✅ Content drafting (with AI-powered writing)
- ✅ Internet research capabilities for up-to-date content
- ✅ Image generation (using DALL-E 3)
- ⏳ Content adaptation for multiple platforms (coming soon)
- ⏳ SEO optimization (planned)
- ⏳ Review & export options (planned)

## How to Use
1. **Start with an Idea**: Enter your content topic or idea
2. **Generate an Outline**: The AI will create a structured outline for your content
3. **Create a Draft**: Turn your outline into a complete draft article with up-to-date research
4. **Generate an Image**: Create a custom image that matches your content

## Tech Stack
**Frontend:** Next.js (React), Tailwind CSS, Custom UI components

**Backend:** Python, FastAPI, pydantic_AI, OpenAI

**Agent Architecture:**
- pydantic_AI for composable agent frameworks
- MCPServerStdio for Perplexity research capabilities
- Multi-agent approach for drafting with internet research

**APIs:** 
- OpenAI GPT (for text generation)
- Perplexity (for internet research)
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

## Draft Generation Process
1. The system receives an outline from the user
2. Using the Perplexity MCP server, the draft agent researches key facts about the outline topics
3. Based on the research, the agent generates a comprehensive, factually accurate draft
4. The system includes error handling and fallback mechanisms for reliability

## Setup Instructions
1. Clone the repository
2. Create a `.env` file in the project root with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PERPLEXITY_API_KEY=your_perplexity_api_key_here
   LLM_MODEL=gpt-4o
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

## Deployment Guide (Prototype)

Since this application is already containerized, we can deploy it using container-based hosting services. This guide outlines how to deploy the prototype to the internet using free or low-cost container hosting services.

### Direct Docker Deployment

This project includes a production-ready Docker Compose configuration in `docker-compose.prod.yml`. To use it:

1. **Set up your environment variables**:
   - Create a `.env` file with all required API keys and configuration
   - Review the default values in `docker-compose.prod.yml`

2. **Deploy with Docker Compose**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **For cloud deployment**:
   - Upload both your code and the `docker-compose.prod.yml` file to your server
   - Set environment variables in your cloud provider's dashboard
   - Run the Docker Compose command

4. **Monitoring and managing your deployment**:
   ```bash
   # Check container status
   docker-compose -f docker-compose.prod.yml ps
   
   # View logs
   docker-compose -f docker-compose.prod.yml logs -f
   
   # View logs of a specific service
   docker-compose -f docker-compose.prod.yml logs -f backend
   
   # Restart services
   docker-compose -f docker-compose.prod.yml restart
   
   # Update and redeploy
   docker-compose -f docker-compose.prod.yml down
   git pull
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

### Option 1: Railway (Recommended for Prototypes)

[Railway](https://railway.app) provides one of the simplest ways to deploy Docker containers with a reasonable free tier.

1. **Create a Railway account and install CLI**:
   - Sign up at [railway.app](https://railway.app)
   - Install the CLI: `npm i -g @railway/cli`
   - Login: `railway login`

2. **Update environment variables**:
   - In the frontend's `lib/api.ts`, ensure the API URL uses an environment variable:
     ```typescript
     const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
     ```

3. **Deploy the application**:
   - Navigate to the project root
   - Initialize Railway: `railway init`
   - Deploy with: `railway up`
   - Set environment variables in the Railway dashboard:
     - `OPENAI_API_KEY`
     - `PERPLEXITY_API_KEY`
     - `LLM_MODEL`
     - `ALLOWED_ORIGINS` (your frontend URL)
     - `NEXT_PUBLIC_API_URL` (your backend URL)

4. **Connect your domains** (optional):
   - In the Railway dashboard, you can connect custom domains to your services

### Option 2: Fly.io

[Fly.io](https://fly.io) offers global deployment of Docker applications with a generous free tier.

1. **Install Flyctl and authenticate**:
   - Install: Follow instructions at [fly.io/docs/hands-on/install-flyctl](https://fly.io/docs/hands-on/install-flyctl)
   - Login: `fly auth login`

2. **Deploy backend**:
   - Navigate to the backend directory
   - Launch: `fly launch`
   - Set secrets: `fly secrets set OPENAI_API_KEY=your_key PERPLEXITY_API_KEY=your_key`
   - Deploy: `fly deploy`

3. **Deploy frontend**:
   - Navigate to the frontend directory
   - Set environment variable for API URL:
     ```bash
     fly secrets set NEXT_PUBLIC_API_URL=https://your-backend-app.fly.dev
     ```
   - Launch: `fly launch`
   - Deploy: `fly deploy`

### Option 3: Render

[Render](https://render.com) supports Docker deployments with a free trial period.

1. **Create a Render account**:
   - Sign up at [render.com](https://render.com)

2. **Create a new Web Service**:
   - Choose "Docker" as the environment
   - Connect to your GitHub repository
   - Select the root directory with your docker-compose.yml
   - Specify the services to deploy

3. **Set environment variables**:
   - Add all necessary environment variables in the Render dashboard

### Important Notes for Container Deployment

1. **Persistent Storage**: Free tiers might not include persistent storage; consider using a managed database service
2. **Environment Variables**: Ensure all API keys and configuration are set as environment variables
3. **Network Configuration**: Make sure the containers can communicate with each other
4. **CORS Configuration**: Update the CORS settings in the backend to allow your frontend domain
5. **Resource Limits**: Be aware of the resource limits (CPU/memory) in free tiers
6. **Cold Starts**: Services might experience "cold starts" after periods of inactivity
7. **Cost Management**: Set up budget alerts if using paid tiers

### Database Considerations

For prototype deployment, you can:

1. Use Railway's PostgreSQL add-on
2. Use Fly.io's built-in Postgres offering
3. Connect to a free ElephantSQL instance
4. Use Docker volume for simplicity (not recommended for production)
