import asyncpg
import os
from datetime import datetime
from typing import Optional, List, Dict
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/vibemind_assistant"
)

pool: Optional[asyncpg.Pool] = None


async def init_db():
    global pool
    try:
        pool = await asyncpg.create_pool(
            DATABASE_URL,
            min_size=1,
            max_size=10,
            command_timeout=60
        )
        await create_tables()
        print("Database connection established and tables created")
    except Exception as e:
        print(f"Error initializing database: {str(e)}")
        print("Please ensure PostgreSQL is running and DATABASE_URL is correct")
        raise


async def close_db():
    global pool
    if pool:
        await pool.close()
        print("Database connection closed")


async def create_tables():
    async with pool.acquire() as conn:
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS conversations (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL,
                user_message TEXT NOT NULL,
                assistant_response TEXT,
                is_error BOOLEAN DEFAULT FALSE,
                error_message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        await conn.execute("""
            CREATE INDEX IF NOT EXISTS idx_session_id 
            ON conversations(session_id)
        """)
        
        await conn.execute("""
            CREATE INDEX IF NOT EXISTS idx_created_at 
            ON conversations(created_at)
        """)


async def save_request(session_id: str, user_message: str) -> int:
    if not pool:
        raise Exception("Database pool not initialized")
    try:
        async with pool.acquire() as conn:
            conversation_id = await conn.fetchval("""
                INSERT INTO conversations (session_id, user_message, is_error)
                VALUES ($1, $2, FALSE)
                RETURNING id
            """, session_id, user_message)
            return conversation_id
    except Exception as e:
        print(f"Error saving request to database: {str(e)}")
        raise


async def update_response(conversation_id: int, assistant_response: str, is_error: bool = False, error_message: Optional[str] = None):
    if not pool:
        print("Warning: Database pool not initialized, skipping response update")
        return
    try:
        async with pool.acquire() as conn:
            await conn.execute("""
                UPDATE conversations
                SET assistant_response = $1,
                    is_error = $2,
                    error_message = $3,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $4
            """, assistant_response, is_error, error_message, conversation_id)
    except Exception as e:
        print(f"Error updating response in database: {str(e)}")


async def get_conversation_history(session_id: str, limit: int = 50) -> List[Dict]:
    async with pool.acquire() as conn:
        rows = await conn.fetch("""
            SELECT id, session_id, user_message, assistant_response, 
                   is_error, error_message, created_at, updated_at
            FROM conversations
            WHERE session_id = $1
            ORDER BY created_at DESC
            LIMIT $2
        """, session_id, limit)
        
        return [
            {
                "id": row["id"],
                "session_id": row["session_id"],
                "user_message": row["user_message"],
                "assistant_response": row["assistant_response"],
                "is_error": row["is_error"],
                "error_message": row["error_message"],
                "created_at": row["created_at"].isoformat() if row["created_at"] else None,
                "updated_at": row["updated_at"].isoformat() if row["updated_at"] else None
            }
            for row in rows
        ]


async def get_conversation_by_id(conversation_id: int) -> Optional[Dict]:
    async with pool.acquire() as conn:
        row = await conn.fetchrow("""
            SELECT id, session_id, user_message, assistant_response,
                   is_error, error_message, created_at, updated_at
            FROM conversations
            WHERE id = $1
        """, conversation_id)
        
        if row:
            return {
                "id": row["id"],
                "session_id": row["session_id"],
                "user_message": row["user_message"],
                "assistant_response": row["assistant_response"],
                "is_error": row["is_error"],
                "error_message": row["error_message"],
                "created_at": row["created_at"].isoformat() if row["created_at"] else None,
                "updated_at": row["updated_at"].isoformat() if row["updated_at"] else None
            }
        return None


async def get_session_stats(session_id: str) -> Dict:
    async with pool.acquire() as conn:
        stats = await conn.fetchrow("""
            SELECT 
                COUNT(*) as total_conversations,
                COUNT(CASE WHEN is_error = TRUE THEN 1 END) as error_count,
                MIN(created_at) as first_conversation,
                MAX(created_at) as last_conversation
            FROM conversations
            WHERE session_id = $1
        """, session_id)
        
        return {
            "session_id": session_id,
            "total_conversations": stats["total_conversations"] or 0,
            "error_count": stats["error_count"] or 0,
            "first_conversation": stats["first_conversation"].isoformat() if stats["first_conversation"] else None,
            "last_conversation": stats["last_conversation"].isoformat() if stats["last_conversation"] else None
        }


async def get_conversation_count(session_id: str) -> int:
    if not pool:
        return 0
    try:
        async with pool.acquire() as conn:
            count = await conn.fetchval("""
                SELECT COUNT(*) 
                FROM conversations
                WHERE session_id = $1
            """, session_id)
            return count or 0
    except Exception as e:
        print(f"Error counting conversations: {str(e)}")
        return 0

