# **📊 Insight Flow**

A Generative AI powered **Question-Answering**, **Data Analytics** system that allows users to upload structured data like **CSV**, **Excel** files and query data interactively.

Get **text** or **Chart** responses depending upon the query. The chat history is maintained, ensuring smooth and engaging experience.

## **🚀 Features**

✅ **Upload CSV/Excel Files** (Supports sheet selection for Excel)  
✅ **Interactive Chat Interface** (User queries on the right, AI responses on the left)  
✅ **Text-Based and Chart Responses** (Automatically detects whether to return text or a Plotly chart)  
✅ **Dynamic Chat History** (Newest messages appear at the top)  
✅ **Visually Appealing UI** (Chat bubbles for a better experience)

<div align="center">
<img src="https://github.com/user-attachments/assets/0fa40982-9b4f-4006-86ad-b4c26187adf9" width="700"/>
</div>

## **📦 Installation**

1️⃣ **Clone the repository**

```bash
git clone https://github.com/d1pankarmedhi/InsightFlow.git
cd InsightFlow
```

2️⃣ **Setup the environment variables**

```bash
# .env
GEMINI_API_KEY=gemini-api-key
```

3️⃣ **Create a virtual environment for Backend**

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

4️⃣ **Install dependencies and start the Backend**

```bash
cd backend
pip install -r requirements.txt
python main.py
```

5️⃣ **Start frontend**

```bash
cd frontend
npm i --verbose
npm run dev
```

## **🛠 Project Info**

- **🧠 LLM**: Gemini-1.5-Flash
- **📊 Pandas** (Data processing)
- **📉 Plotly** (For generating visualizations)
- **📢 Streamlit** (Frontend and UI)

## **🌟 How It Works**

1. **Upload a CSV or Excel file**
2. **Ask questions about your data** (e.g., "Show a chart of sales trends")
3. **Get instant responses** (Text-based summaries or Plotly charts)
4. **All queries & responses are stored in chat history**

<!--
## **📝 To-Do / Future Enhancements**

- [ ] **Enhance NLP Capabilities** for better query understanding
- [ ] **Add Authentication** to save user chat history
- [ ] **Improve UI/UX** with more customization options

--- -->

## **🤝 Contributing**

Contributions are welcome! Feel free to submit an issue or a pull request.

## **📜 License**

This project is licensed under the **MIT License**.

### **💡 Need Help?**

If you have any questions, feel free to reach out! 🚀
