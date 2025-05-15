from langchain.chat_models import ChatOpenAI
import os
from app.agents.prompts import OUTLINE_AGENT_SYSTEM_PROMPT, OUTLINE_AGENT_USER_PROMPT
from openai import OpenAI

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

# Create the OpenAI client directly (skipping Langchain's ChatOpenAI)
client = OpenAI(api_key=OPENAI_API_KEY)

def generate_outline(topic: str) -> str:
    """Generate an outline for the given topic"""
    try:
        # Use the OpenAI client directly
        messages = [
            {"role": "system", "content": OUTLINE_AGENT_SYSTEM_PROMPT},
            {"role": "user", "content": OUTLINE_AGENT_USER_PROMPT.format(topic=topic)}
        ]
        
        # Create a completion with the appropriate model
        response = client.chat.completions.create(
            model=LLM_MODEL,
            messages=messages,
        )
        
        # Extract the content from the response
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating outline: {e}")
        # Fallback to a simple outline
        return f"# {topic}\n\n## Introduction\n\n## Key Points\n\n## Conclusion" 