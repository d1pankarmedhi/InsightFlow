import io
from contextlib import redirect_stdout
from typing import Any, Dict, List

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import uvicorn
from core.router import answer
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="InsightGen API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InsightRequest(BaseModel):
    query: str
    data: List[Dict[str, Any]]


@app.get("/")
async def root():
    return {"message": "Welcome to InsightGen API"}


@app.post("/api/insight")
async def get_insight(request: InsightRequest):
    try:
        df = pd.DataFrame(request.data)
        code_response = answer(df, request.query)
        namespace = {
            "df": df,
            "px": px,
            "go": go,
            "pd": pd,
        }

        # Capture printed output
        output_buffer = io.StringIO()
        with redirect_stdout(output_buffer):
            exec(code_response, namespace)

        printed_output = output_buffer.getvalue().strip()

        if "fig" in code_response:
            fig = namespace.get("fig")
            print("figure", fig.to_json())
            if fig:
                return {"type": "plot", "data": fig.to_json()}
            else:
                raise HTTPException(status_code=400, detail="Chart generation failed")

        return {
            "type": "text",
            "data": printed_output if printed_output else "No output generated",
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
