from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.agents.outline_agent import generate_outline
from app.agents.draft_agent import generate_draft
from app.agents.image_agent import generate_image_openai, format_image_prompt
from app.schemas.outline import OutlineRequest, OutlineResponse
from app.schemas.draft import DraftRequest, DraftResponse
from app.schemas.image import ImageRequest, ImageResponse
from fastapi import HTTPException

app = FastAPI()

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AI Content Co-Pilot backend is running."}

@app.post("/outline", response_model=OutlineResponse)
def outline(request: OutlineRequest):
    outline = generate_outline(request.topic)
    return OutlineResponse(outline=outline)

@app.post("/draft", response_model=DraftResponse)
def draft(request: DraftRequest):
    try:
        # Generate the draft content
        draft_content = generate_draft(request.outline)
        
        # For now, we just return the draft content with metadata
        # In a future enhancement, we can modify generate_draft to return sources too
        return DraftResponse(
            draft=draft_content,
            metadata={"generated_with": "pydantic_ai multi-agent system with Perplexity research"},
            research_sources=[
                # In a future implementation, we'll return actual sources from Perplexity
                {"title": "Research via Perplexity", "url": "https://www.perplexity.ai/"}
            ]
        )
    except Exception as e:
        print(f"Error generating draft: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/image", response_model=ImageResponse)
def image(request: ImageRequest):
    # If the request already contains a formatted prompt, use it directly
    # Otherwise, format it using the template (which might be the case in future enhancements)
    formatted_prompt = request.prompt
    image_url = generate_image_openai(formatted_prompt)
    return ImageResponse(image_url=image_url)

# Placeholder for agent endpoints
