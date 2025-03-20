import html
import io
import re
from contextlib import redirect_stdout

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

from core.router import answer

st.set_page_config(page_title="InsightGen", layout="centered")


def get_insight(query, data):
    code_response = answer(data, query)
    local_vars = {}
    output_buffer = io.StringIO()
    try:
        with redirect_stdout(output_buffer):
            exec(code_response, {"df": data, "px": px, "go": go, "pd": pd}, local_vars)
    except Exception as e:
        return f"Error in code execution: {e}"

    if "fig" in code_response:
        fig = local_vars.get("fig", None)
        if fig is not None:
            return fig
        else:
            return "Error: 'fig' was expected but not defined in the executed code."
    else:
        printed_output = output_buffer.getvalue()
        if printed_output:
            return printed_output
        else:
            return "No output produced by the code."


def display_chat_bubble(author, message):
    if author == "User":
        alignment = "flex-end"
        color = "#DCF8C6"
    else:
        alignment = "flex-start"
        color = "#F1F0F0"
    message = html.escape(message)

    bubble_html = f"""
    <div style="display: flex; justify-content: {alignment}; margin-bottom: 10px;">
        <div style="background-color: {color}; padding: 10px; border-radius: 10px; max-width: 80%;">
            <b>{author}:</b> {message}
        </div>
    </div>
    """
    bubble_html = re.sub(r"</div>", "", bubble_html)
    st.markdown(bubble_html, unsafe_allow_html=True)


def main():
    st.sidebar.title("Streamlit Chat App")
    st.sidebar.header("Upload File")
    uploaded_file = st.sidebar.file_uploader(
        "Upload your CSV or Excel file", type=["csv", "xlsx", "xls"]
    )

    data = None
    if uploaded_file is not None:
        if uploaded_file.name.endswith(".csv"):
            data = pd.read_csv(uploaded_file)
        else:
            # Process Excel files
            xls = pd.ExcelFile(uploaded_file)
            sheet_name = st.sidebar.selectbox(
                "Select the sheet from the Excel file", xls.sheet_names
            )
            data = pd.read_excel(uploaded_file, sheet_name=sheet_name)

    if data is not None:
        with st.expander("Show Data Preview"):
            st.dataframe(data.head())

    st.markdown(
        "<h2 style='text-align: center;'>Get Insights from Your Data</h2>",
        unsafe_allow_html=True,
    )
    # Initialize chat history in session state
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    with st.form(key="query_form", clear_on_submit=True):
        query = st.text_input("Enter your query")
        submit = st.form_submit_button("Submit Query")
        if submit:
            if query:
                result = get_insight(query, data)
                st.session_state.chat_history.insert(
                    0, {"query": query, "response": result}
                )
            else:
                st.write("Please enter a query before submitting.")

    # Display chat history
    for chat in st.session_state.chat_history:
        display_chat_bubble("User", chat["query"])
        if isinstance(chat["response"], str):
            display_chat_bubble("Assistant", chat["response"])
        else:
            display_chat_bubble("Assistant", "")
            st.plotly_chart(chat["response"])


if __name__ == "__main__":
    main()
