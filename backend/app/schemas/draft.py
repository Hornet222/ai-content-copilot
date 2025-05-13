from pydantic import BaseModel

class DraftRequest(BaseModel):
    outline: str

class DraftResponse(BaseModel):
    draft: str 