from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="Personal Portfolio API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    return {
        "success": True,
        "message": "Your message has been received successfully 🚀",
        "data": {
            "name": message.name,
            "email": message.email,
            "message": message.message
        }
    }
