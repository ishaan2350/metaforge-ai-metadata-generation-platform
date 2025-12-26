"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Sliders, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
                    Settings
                </h1>
                <p className="text-zinc-400">Manage your account preferences and AI configuration.</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Section */}
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Profile Information</h2>
                            <p className="text-sm text-zinc-500">Update your personal details.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none" defaultValue="Ishaan Developer" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <input className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none" defaultValue="ishaan@metaforge.ai" />
                        </div>
                    </div>
                </motion.section>

                {/* AI Config Section */}
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                            <Sliders className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">AI Configuration</h2>
                            <p className="text-sm text-zinc-500">Adjust how LLaMA 2 processes your documents.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                            <div>
                                <h3 className="font-medium text-sm">Auto-Generate Metadata</h3>
                                <p className="text-xs text-zinc-500">Automatically process new uploads.</p>
                            </div>
                            <div className="w-10 h-6 rounded-full bg-blue-600 relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                            <div>
                                <h3 className="font-medium text-sm">Strict Confidence Threshold</h3>
                                <p className="text-xs text-zinc-500">Flag results below 80% confidence.</p>
                            </div>
                            <div className="w-10 h-6 rounded-full bg-zinc-700 relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-zinc-400 shadow-sm" />
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-end pt-4">
                    <Button className="gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
