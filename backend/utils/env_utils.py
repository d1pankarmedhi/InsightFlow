import os

from dotenv import load_dotenv
from utils.logger import logger

load_dotenv(
    os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"),
    override=True,
)


class Env:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        logger.error("GEMINI_API_KEY is not set")
        raise ValueError("GEMINI_API_KEY is not set")
