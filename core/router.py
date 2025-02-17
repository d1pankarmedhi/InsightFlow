import pandas as pd

from constants import answer_by_chart_prompt, answer_by_text_prompt, routing_prompt
from core.generation import Generation
from utils.data_utils import df_info_to_markdown
from utils.logger import get_logger
from utils.string_utils import extract_codeblocks, extract_plotly_code, extract_route

logger = get_logger()
generation = Generation()


def prompt_router(df: pd.DataFrame, query: str) -> str:
    """Query Router for generating `text` or `chart` response.

    Args:
        df (pd.DataFrame): user uploaded dataset
        query (str): user input query

    Returns:
        str: returns either `text` or `chart`
    """
    router_prompt = routing_prompt.format(
        df.head().to_markdown(), df_info_to_markdown(df), query
    )
    logger.info("Running router...")
    return extract_route(generation.generate_text(router_prompt))


def answer_router(df: pd.DataFrame, query: str) -> str:
    """
    Generates a text-based response for the given query using the provided dataframe.

    Args:
        df (pd.DataFrame): The user-uploaded dataset.
        query (str): The user input query.

    Returns:
        str: The generated text response encapsulated within code blocks.
    """

    answer_prompt = answer_by_text_prompt.format(
        df.head().to_markdown(), df_info_to_markdown(df), query
    )
    logger.info("Generating text response...")
    return extract_codeblocks(generation.generate_text(answer_prompt))


def chart_router(df: pd.DataFrame, query: str) -> str:
    """
    Generates a Plotly chart response for the given query using the provided dataframe.

    Args:
        df (pd.DataFrame): The user-uploaded dataset.
        query (str): The user input query.

    Returns:
        str: The generated Plotly code encapsulated within plotly tags.
    """

    answer_prompt = answer_by_chart_prompt.format(
        df.head().to_markdown(), df_info_to_markdown(df), query
    )
    logger.info("Generating chart response...")
    return extract_plotly_code(generation.generate_text(answer_prompt))


def answer(df: pd.DataFrame, query: str) -> str:
    """Route query to either text or chart generation.

    Args:
        df (pd.DataFrame): user uploaded dataset
        query (str): user input query

    Returns:
        str: either text or plotly code
    """
    route = prompt_router(df, query)
    if route == "text":
        return answer_router(df, query)
    elif route == "chart":
        return chart_router(df, query)
