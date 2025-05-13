from pydantic import BaseModel, Field

class ImageRequest(BaseModel):
    """Request for image generation"""
    prompt: str = Field(..., description="Text prompt for image generation")

class ImageResponse(BaseModel):
    """Response with generated image URL"""
    image_url: str = Field(..., description="URL of the generated image") 