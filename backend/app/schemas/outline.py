from pydantic import BaseModel

class OutlineRequest(BaseModel):
    topic: str

class OutlineResponse(BaseModel):
    outline: str 