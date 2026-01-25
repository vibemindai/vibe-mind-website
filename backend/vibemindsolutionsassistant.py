from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from sse_starlette.sse import EventSourceResponse
from openai import AsyncOpenAI
import os
import re
from dotenv import load_dotenv
from contextlib import asynccontextmanager
import database

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.init_db()
    yield
    await database.close_db()

app = FastAPI(lifespan=lifespan)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
client = AsyncOpenAI(api_key=OPENAI_KEY)


class GenerateRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000, description="User message to process")

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Message cannot be empty or contain only whitespace")
        return v.strip()


def is_gibberish(text: str) -> bool:
    text = text.lower().strip()
    if len(text) < 3:
        return False
    
    letter_count = sum(1 for c in text if c.isalpha())
    total_chars = len([c for c in text if c.isalnum()])
    
    if total_chars == 0:
        return True
    
    letter_ratio = letter_count / total_chars if total_chars > 0 else 0
    
    consecutive_repeats = len(re.findall(r'(.)\1{3,}', text))
    
    if consecutive_repeats > 2:
        return True
    
    if letter_ratio < 0.5 and len(text) > 10:
        return True
    
    words = text.split()
    if len(words) > 5:
        unique_chars = len(set(text.replace(" ", "")))
        if unique_chars < len(text) * 0.3:
            return True
    
    return False


def validate_input_quality(text: str) -> tuple[bool, str]:
    if not text or len(text.strip()) == 0:
        return False, "Please provide a valid message. Your input appears to be empty."
    
    if len(text.strip()) < 2:
        return False, "Your message is too short. Please provide a more detailed question or request."
    
    if is_gibberish(text):
        return False, "I notice your message might contain random characters or unclear text. Could you please rephrase your question about VibeMindAI Solutions? I'm here to help you learn about our AI services, consulting, and solutions."
    
    if len(text) > 500:
        return False, "Your message is too long. Please limit your message to 5000 characters."
    
    return True, ""


@app.get("/")
async def root():
    return {"message": "VibeMind Solutions Assistant"}


@app.post("/api/generate")
async def proxy_generate(request: GenerateRequest, http_request: Request):
    conversation_id = None
    try:
        session_id = http_request.headers.get("x-session-id")
        if not session_id or not session_id.strip():
            raise HTTPException(
                status_code=400,
                detail="Missing required header: x-session-id"
            )
        
        session_id = session_id.strip()
        user_message = request.message
        print("Incoming request:", {"message": user_message[:100] + "..." if len(user_message) > 100 else user_message, "session_id": session_id})
        
        conversation_count = await database.get_conversation_count(session_id)
        if conversation_count >= 15:
            async def limit_generator():
                limit_message = "Maximum conversation limit reached. Please contact info@vibemindsolutions.ai or +918281442486"
                yield f"data: {limit_message}\n\n"
            return EventSourceResponse(limit_generator())
        
        conversation_id = await database.save_request(session_id, user_message)
        
        is_valid, error_message = validate_input_quality(user_message)
        
        if not is_valid:
            error_response = f"I apologize, but I couldn't process your request. {error_message} Please feel free to ask me about VibeMindAI Solutions' services, AI consulting, or how we can help your business with artificial intelligence solutions."
            await database.update_response(conversation_id, error_response, is_error=True, error_message=error_message)
            
            async def error_generator():
                yield f"data: {error_response}\n\n"
            return EventSourceResponse(error_generator())
        
        system_prompt = """
You are an AI assistant for VibeMindAI Solutions (VIBE MIND AI SOLUTIONS PRIVATE LIMITED), an AI and technology company based in Ernakulam, Kerala, India. The company specializes in building advanced artificial intelligence and machine learning solutions for businesses across industries. VibeMindAI Solutions helps organizations adopt AI-driven capabilities such as intelligent chatbots, conversational assistants, automation tools, predictive analytics, AI consulting, custom model development, and enterprise integrations. The company focuses on using AI responsibly to automate workflows, enhance productivity, and provide data-driven insights that solve real-world business challenges.

The assistant should respond to user queries by giving accurate, helpful information about the company's mission, services, industry applications, expertise, and AI offerings. Provide responses that reflect a deep understanding of the company's focus on AI solutions, AI-powered products, customized AI development, business transformation with AI, consulting services, and the value it delivers to clients. When the user asks about specific services, answer in a way that highlights VibeMindAI's role in applying AI, machine learning, automation, natural language processing, and predictive analytics in business environments.

Always maintain a professional tone, align answers with VibeMindAI Solutions' domain expertise in AI technologies, and provide responses that reflect the company's mission to empower businesses with intelligent automation and data-driven decision-making.

If a user sends unclear, inappropriate, or nonsensical input, politely redirect them by saying: "I'd be happy to help you learn about VibeMindAI Solutions. Could you please rephrase your question? I can provide information about our AI services, consulting, automation solutions, or how we help businesses transform with artificial intelligence."
"""
        
        async def event_generator():
            full_response = ""
            try:
                response = await client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_message}
                    ],
                    stream=True,
                    temperature=0.7
                )

                async for chunk in response:
                    if chunk.choices and len(chunk.choices) > 0:
                        delta = chunk.choices[0].delta.content
                        if delta:
                            full_response += delta
                            yield f"data: {delta}\n\n"
                
                await database.update_response(conversation_id, full_response, is_error=False)
                
            except Exception as e:
                error_msg = "I apologize, but I encountered an issue processing your request. Please try again or rephrase your question about VibeMindAI Solutions."
                await database.update_response(conversation_id, error_msg, is_error=True, error_message=str(e))
                yield f"data: {error_msg}\n\n"
                print(f"Error in OpenAI API call: {str(e)}")

        return EventSourceResponse(event_generator())
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in proxy_generate: {str(e)}")
        if conversation_id:
            error_response = "I apologize, but I encountered an error processing your request. Please ensure your message is clear and try again. If you have questions about VibeMindAI Solutions, I'm here to help!"
            await database.update_response(conversation_id, error_response, is_error=True, error_message=str(e))
        
        async def error_generator():
            error_response = "I apologize, but I encountered an error processing your request. Please ensure your message is clear and try again. If you have questions about VibeMindAI Solutions, I'm here to help!"
            yield f"data: {error_response}\n\n"
        return EventSourceResponse(error_generator())


@app.get("/api/conversations/{session_id}")
async def get_conversations(session_id: str, limit: int = 50):
    try:
        conversations = await database.get_conversation_history(session_id, limit)
        return {"session_id": session_id, "conversations": conversations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching conversations: {str(e)}")


@app.get("/api/conversations/{session_id}/stats")
async def get_session_stats(session_id: str):
    try:
        stats = await database.get_session_stats(session_id)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching session stats: {str(e)}")
