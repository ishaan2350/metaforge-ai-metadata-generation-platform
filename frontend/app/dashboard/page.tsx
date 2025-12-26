"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertTriangle, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', docs: 4, accuracy: 88 },
    { name: 'Tue', docs: 3, accuracy: 92 },
    { name: 'Wed', docs: 7, accuracy: 90 },
    { name: 'Thu', docs: 5, accuracy: 95 },
    { name: 'Fri', docs: 9, accuracy: 94 },
    { name: 'Sat', docs: 2, accuracy: 98 },
    { name: 'Sun', docs: 1, accuracy: 99 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
                    Data Overview
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span>Last updated: just now</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Documents", value: "1,248", icon: FileText, change: "+12%", color: "text-blue-400" },
                    { label: "Metadata Coverage", value: "98.5%", icon: CheckCircle, change: "+0.5%", color: "text-green-400" },
                    { label: "Low Confidence", value: "12", icon: AlertTriangle, change: "-4", color: "text-amber-400" },
                    { label: "Avg. Accuracy", value: "94.2%", icon: Activity, change: "+1.2%", color: "text-purple-400" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:border-blue-500/20 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg bg-zinc-800/50 ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold font-display">{stat.value}</h3>
                            <p className="text-sm text-zinc-500">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    className="lg:col-span-2 p-6 rounded-2xl bg-card/50 border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-lg font-semibold mb-6">Processing Activity</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e4e4e7' }}
                                />
                                <Area type="monotone" dataKey="docs" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDocs)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    className="p-6 rounded-2xl bg-card/50 border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="text-sm font-medium truncate">Quarterly_Report_Q3_2024.pdf</h4>
                                    <p className="text-xs text-zinc-500">Processed 2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
