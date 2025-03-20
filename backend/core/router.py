from typing import Optional

import pandas as pd
from constants import answer_by_chart_prompt, answer_by_text_prompt, routing_prompt
from utils.data_utils import df_info_to_markdown
from utils.logger import get_logger
from utils.string_utils import extract_codeblocks, extract_plotly_code, extract_route

from .generation import Generation

logger = get_logger()
generation = Generation()


def prompt_router(df: pd.DataFrame, query: str) -> Optional[str]:
    """Query Router for generating `text` or `chart` response.

    Args:
        df (pd.DataFrame): user uploaded dataset
        query (str): user input query

    Returns:
        Optional[str]: returns either `text` or `chart`, or None if routing fails
    """
    try:
        router_prompt = routing_prompt.format(
            df.head().to_markdown(), df_info_to_markdown(df), query
        )
        logger.info("Running router for query: %s", query)
        route = extract_route(generation.generate_text(router_prompt))
        logger.info("Router determined response type: %s", route)
        return route
    except Exception as e:
        logger.error("Error in prompt router: %s", str(e))
        return None


def answer_router(df: pd.DataFrame, query: str) -> Optional[str]:
    """
    Generates a text-based response for the given query using the provided dataframe.

    Args:
        df (pd.DataFrame): The user-uploaded dataset.
        query (str): The user input query.

    Returns:
        Optional[str]: The generated text response encapsulated within code blocks,
                      or None if generation fails.
    """
    try:
        answer_prompt = answer_by_text_prompt.format(
            df.head().to_markdown(), df_info_to_markdown(df), query
        )
        logger.info("Generating text response for query: %s", query)
        response = generation.generate_text(answer_prompt)
        if response:
            return extract_codeblocks(response)
        return None
    except Exception as e:
        logger.error("Error in answer router: %s", str(e))
        return None


def chart_router(df: pd.DataFrame, query: str) -> Optional[str]:
    """
    Generates a Plotly chart response for the given query using the provided dataframe.

    Args:
        df (pd.DataFrame): The user-uploaded dataset.
        query (str): The user input query.

    Returns:
        Optional[str]: The generated Plotly code encapsulated within plotly tags,
                      or None if generation fails.
    """
    try:
        answer_prompt = answer_by_chart_prompt.format(
            df.head().to_markdown(), df_info_to_markdown(df), query
        )
        logger.info("Generating chart response for query: %s", query)
        response = generation.generate_text(answer_prompt)
        if response:
            return extract_plotly_code(response)
        return None
    except Exception as e:
        logger.error("Error in chart router: %s", str(e))
        return None


def answer(df: pd.DataFrame, query: str) -> Optional[str]:
    """Route query to either text or chart generation.

    Args:
        df (pd.DataFrame): user uploaded dataset
        query (str): user input query

    Returns:
        Optional[str]: either text or plotly code, or None if processing fails
    """
    try:
        route = prompt_router(df, query)
        if route == "text":
            return answer_router(df, query)
        elif route == "chart":
            return chart_router(df, query)
        else:
            logger.warning("Invalid route type received: %s", route)
            return None
    except Exception as e:
        logger.error("Error in answer function: %s", str(e))
        return None
