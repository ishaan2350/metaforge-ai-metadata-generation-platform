"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
        { role: 'ai', text: "Hello! I'm MetaSense. You can speak to me or type commands." }
    ]);
    const [inputValue, setInputValue] = useState("");

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const toggleListening = () => {
        setIsListening(!isListening);
        // TODO: Implement Web Speech API
        if (!isListening) {
            // Mock listening interaction
            setTimeout(() => {
                setInputValue("Show me the latest documents");
                setIsListening(false);
            }, 3000);
        }
    };

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        const newMsg = { role: 'user' as const, text: inputValue };
        setMessages(prev => [...prev, newMsg]);
        setInputValue("");

        // Mock AI Response with delay
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'ai', text: "I found 5 new documents uploaded today. Would you like a summary?" }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-96 h-[500px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header / Avatar Area */}
                        <div className="p-4 bg-gradient-to-b from-blue-900/20 to-transparent border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden relative">
                                    {/* Simple CSS Avatar Animation */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`w-full h-1 bg-white absolute top-1/2 left-0 transition-all duration-100 ${isListening ? 'animate-pulse' : ''}`} />
                                        {/* Eyes */}
                                        <div className="w-2 h-2 bg-white rounded-full absolute top-3 left-2" />
                                        <div className="w-2 h-2 bg-white rounded-full absolute top-3 right-2" />
                                        {/* Mouth */}
                                        <div className={`w-4 h-1 bg-white rounded-full absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-200 ${isListening ? 'h-3' : 'h-1'}`} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">MetaSense AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs text-zinc-400">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "max-w-[80%] p-3 rounded-2xl text-sm",
                                        msg.role === 'user'
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700"
                                    )}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-zinc-900 border-t border-white/10">
                            <div className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className={cn("h-10 w-10 p-0 rounded-full", isListening ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "")}
                                    onClick={toggleListening}
                                >
                                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </Button>
                                <input
                                    className="flex-1 bg-zinc-800 border-none rounded-full px-4 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="Ask anything..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <Button size="sm" className="h-10 w-10 p-0 rounded-full" onClick={sendMessage}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-500 text-white p-0 relative"
            >
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
                <MessageSquare className="w-6 h-6" />
            </Button>
        </div>
    );
}
