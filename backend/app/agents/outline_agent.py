from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key=OPENAI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert content strategist. Given a topic, generate a detailed blog post outline with sections and bullet points."),
    ("human", "Topic: {topic}")
])

def generate_outline(topic: str) -> str:
    chain = prompt | llm
    result = chain.invoke({"topic": topic})
    return result.content 