from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.agents.outline_agent import generate_outline
from app.agents.draft_agent import generate_draft
from app.schemas.outline import OutlineRequest, OutlineResponse
from app.schemas.draft import DraftRequest, DraftResponse

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
    draft = generate_draft(request.outline)
    return DraftResponse(draft=draft)

# Placeholder for agent endpoints
