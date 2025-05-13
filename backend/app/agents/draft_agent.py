from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key=OPENAI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a professional writer. Given a detailed outline, write a full draft of the article. Expand each section with clear, engaging, and informative content. Use markdown formatting for headings and lists."),
    ("human", "Outline:\n{outline}\n\nWrite the full draft article.")
])

def generate_draft(outline: str) -> str:
    chain = prompt | llm
    result = chain.invoke({"outline": outline})
    return result.content 