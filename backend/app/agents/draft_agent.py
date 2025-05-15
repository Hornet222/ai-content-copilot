from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os
from app.agents.prompts import DRAFT_AGENT_SYSTEM_PROMPT, DRAFT_AGENT_USER_PROMPT

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

llm = ChatOpenAI(model_name=LLM_MODEL, openai_api_key=OPENAI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", DRAFT_AGENT_SYSTEM_PROMPT),
    ("human", DRAFT_AGENT_USER_PROMPT)
])

def generate_draft(outline: str) -> str:
    chain = prompt | llm
    result = chain.invoke({"outline": outline})
    return result.content 