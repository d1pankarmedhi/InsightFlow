import io

import pandas as pd


def df_info_to_markdown(df: pd.DataFrame) -> str:
    """Converts dataframe info to markdown string

    Args:
        df (pd.DataFrame): dataframe to convert

    Returns:
        str: markdown string
    """
    buffer = io.StringIO()
    df.info(buf=buffer)
    info_str = buffer.getvalue()
    buffer.close()

    lines = info_str.split("\n")

    markdown = "\n" + "\n".join(lines) + "\n"
    return markdown
