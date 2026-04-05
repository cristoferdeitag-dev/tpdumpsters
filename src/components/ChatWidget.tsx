"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE = "👋 Hi! I'm the TP Dumpsters AI assistant. How can I help you today?";

const WELCOME_MESSAGE_ES = "👋 ¡Hola! Soy el asistente de TP Dumpsters. ¿En qué puedo ayudarte?";

const QUICK_QUESTIONS = [
  { text: "💰 What's the price of a dumpster?", value: "What's the price of a dumpster?" },
  { text: "🤔 I'm not sure which size I need", value: "I'm not sure which dumpster size I need for my project" },
  { text: "📅 How does your service work?", value: "How does your dumpster rental service work?" },
];

const QUICK_QUESTIONS_ES = [
  { text: "💰 ¿Qué precio tiene un dumpster?", value: "¿Qué precio tiene rentar un dumpster?" },
  { text: "🤔 No estoy seguro qué tamaño necesito", value: "No estoy seguro qué tamaño de dumpster necesito para mi proyecto" },
  { text: "📅 ¿Cómo funciona su servicio?", value: "¿Cómo funciona el servicio de renta de dumpsters?" },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickButtons, setShowQuickButtons] = useState(true);
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const switchLanguage = (lang: "en" | "es") => {
    setLanguage(lang);
    setMessages([{
      role: "assistant",
      content: lang === "en" ? WELCOME_MESSAGE : WELCOME_MESSAGE_ES
    }]);
    setShowQuickButtons(true);
  };

  const handleQuickQuestion = (question: string) => {
    setShowQuickButtons(false);
    handleSend(question);
  };

  const handleSend = async (text?: string) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);
    setShowQuickButtons(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          sessionId,
          language,
          history: messages.slice(-5), // Last 5 messages for context
        }),
      });

      const data = await response.json();

      setIsTyping(false);
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: language === "en"
              ? "Sorry, I'm having trouble connecting. Please call us at **(510) 650-2083** or visit our [booking page](/booking)."
              : "Lo siento, tengo problemas de conexión. Por favor llámanos al **(510) 650-2083** o visita nuestra [página de reservas](/booking).",
          },
        ]);
      }
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: language === "en"
            ? "Sorry, I'm having trouble connecting. Please call us at **(510) 650-2083** or visit our [booking page](/booking)."
            : "Lo siento, tengo problemas de conexión. Por favor llámanos al **(510) 650-2083** o visita nuestra [página de reservas](/booking).",
        },
      ]);
    }
  };

  const quickQuestions = language === "en" ? QUICK_QUESTIONS : QUICK_QUESTIONS_ES;

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[15px] left-[15px] md:bottom-[30px] md:left-[30px] z-[99999] w-[60px] h-[60px] rounded-full bg-red-600 text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-red-700 hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce"
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse flex items-center justify-center text-[10px] font-bold">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[15px] left-[15px] md:bottom-[30px] md:left-[30px] z-[99999] w-[calc(100vw-30px)] max-w-[400px] h-[550px] md:h-[600px] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden bg-white border border-gray-200">
          {/* Header */}
          <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                TP
              </div>
              <div>
                <p className="font-semibold text-sm">TP Dumpsters AI</p>
                <p className="text-xs text-red-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                  Online — Instant replies
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-red-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline">$1</a>')
                  }}
                />
              </div>
            ))}

            {/* Quick Question Buttons */}
            {showQuickButtons && messages.length === 1 && (
              <div className="space-y-2 pt-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-red-200 text-gray-700 text-sm font-medium hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-left flex items-center gap-2"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Language Toggle */}
          <div className="px-4 py-1.5 bg-white border-t border-gray-100 flex gap-2 justify-center">
            <button
              onClick={() => switchLanguage("en")}
              className={`text-xs transition-colors ${
                language === "en" ? "text-red-600 font-semibold" : "text-gray-400 hover:text-red-600"
              }`}
            >
              🇺🇸 English
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => switchLanguage("es")}
              className={`text-xs transition-colors ${
                language === "es" ? "text-red-600 font-semibold" : "text-gray-400 hover:text-red-600"
              }`}
            >
              🇲🇽 Español
            </button>
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-200 flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={language === "en" ? "Type your question..." : "Escribe tu pregunta..."}
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
