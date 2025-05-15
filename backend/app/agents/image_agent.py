from openai import OpenAI
import os
from app.agents.prompts import IMAGE_GENERATION_PROMPT_TEMPLATE

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_image_openai(prompt: str) -> str:
    try:
        # Base path for storing temporarily saved images
        import base64
        import tempfile
        import uuid
        import os
        from pathlib import Path
        
        # First attempt with gpt-image-1 model (which returns base64-encoded image data)
        print("Generating image with gpt-image-1 model...")
        response = client.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            n=1,
            size="1024x1024",
            # format="png" is default, no need to specify
        )
        
        if response.data and len(response.data) > 0:
            # gpt-image-1 returns base64-encoded image data in b64_json field
            image_data = response.data[0].b64_json
            if image_data:
                # We have the image data but we need to save it somewhere and return a URL
                # For simplicity, we could save it to a temp file or determine your image serving strategy
                
                # This is a simple example - in production you might want to save to S3 or other storage
                temp_dir = tempfile.gettempdir()
                image_filename = f"image_{uuid.uuid4()}.png"
                image_path = os.path.join(temp_dir, image_filename)
                
                # Decode and save the image
                with open(image_path, "wb") as image_file:
                    image_file.write(base64.b64decode(image_data))
                
                # Here you would typically upload to a cloud storage or serve from your app
                # For local development, let's instead return the base64 data directly
                # This will let us display it in the browser without needing to serve the file
                image_url = f"data:image/png;base64,{image_data}"
                print(f"Generated image data (returning base64 directly)")
                return image_url
            else:
                raise ValueError("Image data is empty in the response")
        else:
            raise ValueError("No image data found in the response")
    except Exception as e:
        print(f"Error generating image with gpt-image-1: {e}")
        # Fallback to dall-e-3 if gpt-image-1 fails or is not available for the key
        try:
            print("Falling back to dall-e-3 for image generation...")
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                n=1,
                size="1024x1024"
                # No response_format parameter as it's no longer supported
            )
            if response.data and len(response.data) > 0:
                # Check if b64_json is available
                if hasattr(response.data[0], 'b64_json') and response.data[0].b64_json:
                    image_data = response.data[0].b64_json
                    image_url = f"data:image/png;base64,{image_data}"
                    print(f"Generated image with dall-e-3 fallback (using base64)")
                    return image_url
                # Check if url is available
                elif hasattr(response.data[0], 'url') and response.data[0].url:
                    image_url = response.data[0].url
                    print(f"Generated image with dall-e-3 fallback (using URL)")
                    return image_url
                else:
                    raise ValueError("No image data or URL in dall-e-3 fallback response.")
            else:
                raise ValueError("No image data found in DALL-E 3 fallback response.")
        except Exception as fallback_e:
            print(f"Error generating image with DALL-E 3 fallback: {fallback_e}")
            raise fallback_e

def format_image_prompt(topic: str, content_summary: str) -> str:
    """
    Format the image generation prompt using the template
    """
    return IMAGE_GENERATION_PROMPT_TEMPLATE.format(
        topic=topic,
        content_summary=content_summary
    ) 