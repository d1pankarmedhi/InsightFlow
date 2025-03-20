import React, { useState } from "react";
import Plot from "react-plotly.js";
import { Send, User, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  type: "text" | "plot";
  data?: {
    data: any;
    layout?: any;
    config?: any;
  };
}

interface ChatInterfaceProps {
  data: any;
}

export function ChatInterface({ data }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, type: "text" },
    ]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/api/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      let assistantMessage: Message;
      if (result.type === "plot") {
        try {
          // Parse the JSON string from the backend
          const plotData = JSON.parse(result.data);
          console.log(plotData);
          assistantMessage = {
            role: "assistant",
            content: "",
            type: "plot",
            data: {
              data: plotData.data || [],
              layout: plotData.layout || {},
              config: plotData.config || { responsive: true },
            },
          };
        } catch (error) {
          console.error("Error parsing plot data:", error);
          assistantMessage = {
            role: "assistant",
            content: "Failed to render plot data.",
            type: "text",
          };
        }
      } else {
        assistantMessage = {
          role: "assistant",
          content: result.data,
          type: "text",
        };
      }

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "An error occurred while processing your request. Please try again.",
          type: "text",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              message.role === "assistant" ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div
              className={`flex-shrink-0 ${
                message.role === "assistant" ? "order-first" : "order-last"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {message.role === "assistant" ? (
                  <Bot className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
            </div>
            <div
              className={`flex-1 rounded-lg p-4 ${
                message.role === "assistant"
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {message.type === "text" ? (
                <div
                  className={`prose prose-sm ${
                    message.role === "user"
                      ? "text-white dark:text-black"
                      : "dark:prose-invert"
                  }`}
                >
                  {message.content}
                </div>
              ) : (
                <div className="w-full max-w-[800px] mx-auto overflow-x-auto bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Plot
                    data={message.data?.data || []}
                    layout={{
                      ...message.data?.layout,
                      width: undefined,
                      height: 400,
                      margin: { t: 30, r: 20, l: 40, b: 40 },
                      paper_bgcolor: "transparent",
                      plot_bgcolor: "transparent",
                      font: { color: "currentColor" },
                    }}
                    config={{
                      responsive: true,
                      displayModeBar: true,
                      displaylogo: false,
                      modeBarButtonsToRemove: ["lasso2d", "select2d"],
                    }}
                    style={{ width: "100%" }}
                    useResizeHandler={true}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            className="flex-1 min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
