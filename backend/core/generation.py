from typing import Optional

import google.generativeai as genai
from utils.env_utils import Env
from utils.logger import get_logger

logger = get_logger()


class Generation:
    def __init__(self, model_id: str = "gemini-1.5-flash", temperature: float = 0.3):
        """
        Initialize the Generation class.

        Args:
            model_id (str): The model ID to use for generation
            temperature (float): The temperature parameter for generation
        """
        self.temperature = temperature
        self.model_id = model_id

        genai.configure(api_key=Env.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(
            self.model_id,
            generation_config=genai.GenerationConfig(
                temperature=self.temperature,
            ),
        )

    def generate_text(self, prompt: str) -> Optional[str]:
        """
        Generates text based on the given prompt.

        Args:
            prompt (str): The text prompt to generate text from.

        Returns:
            Optional[str]: The generated text, or None if generation fails.
        """
        try:
            logger.info(f"Generating text with prompt: {prompt[:100]}...")
            response = self.model.generate_content(prompt)
            logger.info("Gemini response: %s", response.text)
            return response.text
        except Exception as e:
            logger.error(f"Error generating text: {str(e)}")
            return None
