"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I am HealthEdu AI 👋 I can help explain medical terms, health concepts, and suggest educational topics. What would you like to learn about today?\n\nDisclaimer: I provide educational information only and cannot diagnose or prescribe treatment.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
    };

    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to get AI response.");
      }

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);

      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Sorry, I could not connect to the AI assistant right now. Please check your Gemini API configuration and try again.",
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell title="AI Assistant">
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          height: "calc(100vh - 140px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                gap: "1rem",
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background:
                    msg.role === "assistant"
                      ? "linear-gradient(135deg, var(--brand-500), var(--accent-400))"
                      : "var(--bg-default)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color:
                    msg.role === "assistant"
                      ? "white"
                      : "var(--text-secondary)",
                }}
              >
                {msg.role === "assistant" ? (
                  <Bot size={20} />
                ) : (
                  <User size={20} />
                )}
              </div>

              <div
                style={{
                  background:
                    msg.role === "user"
                      ? "var(--brand-500)"
                      : "hsla(220,20%,15%,0.6)",
                  color: msg.role === "user" ? "white" : "var(--text-primary)",
                  padding: "1rem 1.25rem",
                  borderRadius:
                    msg.role === "user"
                      ? "16px 4px 16px 16px"
                      : "4px 16px 16px 16px",
                  lineHeight: 1.6,
                  fontSize: "0.9375rem",
                  border:
                    msg.role === "assistant"
                      ? "1px solid var(--border-subtle)"
                      : "none",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignSelf: "flex-start",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg, var(--brand-500), var(--accent-400))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Bot size={20} />
              </div>

              <div
                style={{
                  background: "hsla(220,20%,15%,0.6)",
                  padding: "1rem 1.25rem",
                  borderRadius: "4px 16px 16px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Loader2 size={16} className="animate-spin text-brand" />

                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Thinking...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          style={{
            padding: "1.25rem",
            background: "hsla(220,25%,12%,1)",
            border: "1px solid var(--border-subtle)",
            borderTop: "none",
            borderRadius: "0 0 16px 16px",
            display: "flex",
            gap: "0.75rem",
          }}
        >
          <input
            type="text"
            className="form-input"
            placeholder="Ask about a medical term or health concept..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            style={{
              flex: 1,
              background: "var(--bg-default)",
            }}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!input.trim() || isLoading}
            style={{
              width: 48,
              height: 48,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
            }}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
