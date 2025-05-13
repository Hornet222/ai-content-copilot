from openai import OpenAI
import os
from app.agents.prompts import IMAGE_GENERATION_PROMPT_TEMPLATE

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_image_openai(prompt: str) -> str:
    try:
        response = client.images.generate(
            model="dall-e-3", # Using DALL-E 3 as per gpt-4o context
            prompt=prompt,
            n=1,
            size="1024x1024",
            response_format="url" # Get a URL for the image
        )
        if response.data and len(response.data) > 0:
            image_url = response.data[0].url
            if image_url:
                return image_url
            else:
                raise ValueError("Image URL is empty in the response.")
        else:
            raise ValueError("No image data found in the response.")
    except Exception as e:
        print(f"Error generating image with OpenAI: {e}")
        # Fallback to DALL-E 2 if DALL-E 3 fails or is not available for the key
        try:
            print("Falling back to dall-e-2 for image generation...")
            response = client.images.generate(
                model="dall-e-2",
                prompt=prompt,
                n=1,
                size="1024x1024",
                response_format="url"
            )
            if response.data and len(response.data) > 0:
                image_url = response.data[0].url
                if image_url:
                    return image_url
                else:
                    raise ValueError("Image URL is empty in DALL-E 2 fallback response.")
            else:
                raise ValueError("No image data found in DALL-E 2 fallback response.")
        except Exception as fallback_e:
            print(f"Error generating image with DALL-E 2 fallback: {fallback_e}")
            raise fallback_e

def format_image_prompt(topic: str, content_summary: str) -> str:
    """
    Format the image generation prompt using the template
    """
    return IMAGE_GENERATION_PROMPT_TEMPLATE.format(
        topic=topic,
        content_summary=content_summary
    ) 