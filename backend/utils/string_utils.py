import re


def extract_route(text):
    routes = re.findall(r"<route>(.*?)</route>", text, re.DOTALL)
    return routes[0] if routes else ""


def extract_codeblocks(text):
    codeblocks = re.findall(r"<codeblock>(.*?)</codeblock>", text, re.DOTALL)
    return codeblocks[0] if codeblocks else ""


def extract_plotly_code(text):
    match = re.search(r"<plotly_code>(.*?)</plotly_code>", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    else:
        return ""
