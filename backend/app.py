from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import os


app = FastAPI(title="Personal Portfolio API")


# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# Supabase Configuration
# =====================================================

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client | None = None

if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(
        SUPABASE_URL,
        SUPABASE_KEY
    )


# =====================================================
# Contact Request Model
# =====================================================

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


# =====================================================
# Home Endpoint
# =====================================================

@app.get("/")
def home():
    return {
        "message": "Personal Portfolio API is running 🚀"
    }


# =====================================================
# Projects Endpoint
# =====================================================

@app.get("/projects")
def projects():
    return {
        "projects": [
            {
                "name": "SalesPilot AI",
                "description": "AI-powered CRM and sales management platform"
            },
            {
                "name": "NEET Learning Hub",
                "description": "AI-powered learning platform for NEET preparation"
            },
            {
                "name": "DocMind AI",
                "description": "AI-powered document knowledge assistant using RAG"
            },
            {
                "name": "Disease Prediction ML",
                "description": "Machine learning model for heart disease prediction"
            }
        ]
    }


# =====================================================
# Contact Endpoint
# =====================================================

@app.post("/contact")
def contact(message: ContactMessage):

    if supabase is None:
        raise HTTPException(
            status_code=500,
            detail="Database is not configured"
        )

    try:

        response = (
            supabase
            .table("contact_messages")
            .insert({
                "name": message.name,
                "email": message.email,
                "message": message.message
            })
            .execute()
        )

        return {
            "success": True,
            "message": "Your message has been saved successfully 🚀"
        }

    except Exception as error:

        print("Database error:", error)

        raise HTTPException(
            status_code=500,
            detail="Unable to save message"
        )
