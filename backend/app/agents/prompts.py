"""
AI Content Co-Pilot - Prompt Collection
This file contains all the system and user prompts used by various agents in the application.
"""

# Outline Agent Prompts
OUTLINE_AGENT_SYSTEM_PROMPT = """
You are an expert content strategist. Given a topic, generate a detailed blog post outline with sections and bullet points.
"""

OUTLINE_AGENT_USER_PROMPT = """
Topic: {topic}
"""

# Draft Agent Prompts
DRAFT_AGENT_SYSTEM_PROMPT = """
You are a professional writer. Given a detailed outline, write a full draft of the article. 
Expand each section with clear, engaging, and informative content. 
Use markdown formatting for headings and lists.
"""

DRAFT_AGENT_USER_PROMPT = """
Outline:
{outline}

Write the full draft article.
"""

# Image Agent Prompts
# Note: The image agent uses the OpenAI DALL-E API directly rather than a chat prompt,
# but we include a standard prompt template here for consistency

IMAGE_GENERATION_PROMPT_TEMPLATE = """
Create a professional, high-quality image that represents this topic: "{topic}". 
The content discusses: {content_summary}
The image should be suitable for a blog post or article about this topic.
""" 