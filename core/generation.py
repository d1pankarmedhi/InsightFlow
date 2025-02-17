import google.generativeai as genai

from utils.env_utils import Env
from utils.logger import get_logger

logger = get_logger()


class Generation:
    def __init__(self, model_id: str = "gemini-1.5-flash", temperature: float = 0.3):
        self.temperature = temperature
        self.model_id = model_id

        genai.configure(api_key=Env.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(
            self.model_id,
            generation_config=genai.GenerationConfig(
                temperature=self.temperature,
            ),
        )

    def generate_text(self, prompt: str):
        """
        Generates text based on the given prompt.

        Args:
            prompt (str): The text prompt to generate text from.

        Returns:
            str: The generated text.
        """
        try:
            logger.info("Generating text...")
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(e)
