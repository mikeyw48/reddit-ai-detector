from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import GPT2PPL

app = FastAPI()
model = GPT2PPL()


origins = [
    "https://www.reddit.com",   
    "http://localhost",        
    "http://127.0.0.1",        
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,
    allow_methods=["*"],       
    allow_headers=["*"],        
)

class PostText(BaseModel):
    text: str

@app.post("/analyze")
def analyze_post(post: PostText):
    text = post.text
    results, output_message = model(text)
    return {
        "length": len(text),
        "message": output_message,
        "results": results
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
