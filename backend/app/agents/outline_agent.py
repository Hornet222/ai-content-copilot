from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os
from app.agents.prompts import OUTLINE_AGENT_SYSTEM_PROMPT, OUTLINE_AGENT_USER_PROMPT

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key=OPENAI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", OUTLINE_AGENT_SYSTEM_PROMPT),
    ("human", OUTLINE_AGENT_USER_PROMPT)
])

def generate_outline(topic: str) -> str:
    chain = prompt | llm
    result = chain.invoke({"topic": topic})
    return result.content 