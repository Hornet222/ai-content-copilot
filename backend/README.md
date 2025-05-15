# AI Content Co-Pilot Backend

This is the backend service for the AI Content Co-Pilot application, built with FastAPI.

## Features

- Outline generation: Creates a structured outline for any content topic
- Draft generation: Creates a full draft based on an outline using a multi-agent system
- Image generation: Creates relevant images for content using DALL-E 3

## Draft Agent System

The draft generation system uses a multi-agent approach:

1. **Controller Agent**: Coordinates the entire process and combines the work of specialized agents
2. **Research Agent**: Uses Perplexity to find relevant, up-to-date information on each topic
3. **Writer Agent**: Creates content for each section using the research information
4. **Editor Agent**: Combines all sections with proper transitions, intro, and conclusion

### Implementation

The system is built using:
- **pydantic_AI**: For structured validation and agent composition  
- **Perplexity**: For up-to-date research capabilities
- **LangChain**: For agent orchestration and LLM integration

## Environment Variables

The following environment variables are required:

```
# API Keys
OPENAI_API_KEY=your_openai_api_key_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# LLM Model 
LLM_MODEL=gpt-4o  # or another OpenAI model
```

## Running the Backend

1. Install requirements: `pip install -r requirements.txt`
2. Set up environment variables
3. Run the server: `uvicorn app.main:app --reload`

## API Endpoints

- `POST /outline`: Generate content outline from a topic
- `POST /draft`: Generate a full draft from an outline 
- `POST /image`: Generate an image for the content 