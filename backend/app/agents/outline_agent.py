from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os
from app.agents.prompts import OUTLINE_AGENT_SYSTEM_PROMPT, OUTLINE_AGENT_USER_PROMPT

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")

llm = ChatOpenAI(model_name=LLM_MODEL, openai_api_key=OPENAI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", OUTLINE_AGENT_SYSTEM_PROMPT),
    ("human", OUTLINE_AGENT_USER_PROMPT)
])

def generate_outline(topic: str) -> str:
    chain = prompt | llm
    result = chain.invoke({"topic": topic})
    return result.content 