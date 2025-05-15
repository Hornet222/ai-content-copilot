from pydantic import BaseModel
from typing import List, Dict

class DraftRequest(BaseModel):
    outline: str

class ResearchSource(BaseModel):
    title: str
    url: str

class DraftResponse(BaseModel):
    draft: str
    metadata: Dict = {}
    research_sources: List[ResearchSource] = [] 