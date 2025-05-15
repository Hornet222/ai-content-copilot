import os
import asyncio
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from pydantic_ai import Agent
from pydantic_ai.mcp import MCPServerStdio
from openai import OpenAI
from app.agents.prompts import (
    DRAFT_AGENT_SYSTEM_PROMPT,
    DRAFT_CONTROLLER_SYSTEM_PROMPT,
    RESEARCH_AGENT_SYSTEM_PROMPT
)

# Get environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY") 
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o")

# Initialize the OpenAI client directly
openai_client = OpenAI(api_key=OPENAI_API_KEY)

# Initialize Perplexity MCP server
perplexity_server = MCPServerStdio(
    'npx',
    ["-y", "server-perplexity-ask"],
    env={"PERPLEXITY_API_KEY": PERPLEXITY_API_KEY}
)

# Create a draft agent for content generation
draft_agent = Agent(
    LLM_MODEL,
    mcp_servers=[perplexity_server],
    system_prompt=DRAFT_AGENT_SYSTEM_PROMPT,
    instrument=True
)

def generate_draft(outline: str) -> str:
    """
    Generate a full content draft using a multi-agent approach.
    
    Returns:
        str: The markdown content
    """
    try:
        # Since we can't use async directly, we'll use a simpler approach
        # for this implementation
        
        # Create a new event loop for async operations
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        # Create a user prompt that includes research instructions
        user_prompt = f"""
        Here is an outline to turn into a full article:
        
        {outline}
        
        First, research key facts about each section of the outline.
        Then, write a comprehensive article based on the outline and your research.
        Include an introduction, well-developed sections, and a conclusion.
        Use markdown formatting for headings and structure.
        Cite any sources used in your research.
        """
        
        async def run_agent():
            async with draft_agent.run_mcp_servers():
                # Call Perplexity for research through MCP
                research_prompt = f"Research the following outline for a content article: {outline}"
                
                research_messages = [
                    {"role": "user", "content": research_prompt}
                ]
                
                research_response = await draft_agent.call_mcp("perplexity_ask", {
                    "messages": research_messages
                })
                
                research_content = research_response.get("content", "No research found")
                
                # Generate the draft using the research
                final_prompt = f"""
                Here is an outline to turn into a full article:
                
                {outline}
                
                Here is research information to incorporate:
                
                {research_content}
                
                Write a comprehensive article based on the outline and the research.
                Include an introduction, well-developed sections, and a conclusion.
                Use markdown formatting for headings and structure.
                """
                
                result = await draft_agent.run(user_prompt=final_prompt)
                return result
                
        # Run the async function and get the result
        result = loop.run_until_complete(run_agent())
        
        # Close the loop
        loop.close()
        
        # Return the content as a string
        return result
            
    except Exception as e:
        # Fallback to simple implementation if there are any errors
        print(f"Error in agent draft system: {e}")
        print("Falling back to simple implementation")
        
        # Simple fallback implementation using OpenAI client directly
        system_prompt = """You are a professional writer. Given a detailed outline, write a full draft of the article. 
        Expand each section with clear, engaging, and informative content. 
        Use markdown formatting for headings and lists."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Outline:\n{outline}\n\nWrite the full draft article."}
        ]
        
        # Use the OpenAI client directly without temperature parameter
        response = openai_client.chat.completions.create(
            model=LLM_MODEL,
            messages=messages
        )
        
        return response.choices[0].message.content 