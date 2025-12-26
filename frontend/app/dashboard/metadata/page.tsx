"use client";

import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, Tag, Hash, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockMetadata = [
    { id: 1, file: "Q3_Financials.pdf", title: "Q3 2024 Financial Report", tags: ["finance", "quarterly", "public"], confidence: 0.98, status: "Verified" },
    { id: 2, file: "Employee_Handbook_v2.docx", title: "Employee Handbook 2025", tags: ["hr", "internal", "policy"], confidence: 0.92, status: "Verified" },
    { id: 3, file: "Project_Titan_Specs.pdf", title: "Project Titan Technical Specs", tags: ["engineering", "confidential"], confidence: 0.85, status: "Needs Review" },
    { id: 4, file: "Marketing_Plan_2025.pptx", title: "2025 Global Marketing Strategy", tags: ["marketing", "strategy"], confidence: 0.89, status: "Verified" },
    { id: 5, file: "Invoice_#10234.pdf", title: "Vendor Invoice - Acme Corp", tags: ["finance", "external", "invoice"], confidence: 0.65, status: "Low Confidence" },
];

export default function MetadataPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
                        Metadata Records
                    </h1>
                    <p className="text-zinc-400">Manage and review auto-generated metadata.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                    <Button size="sm">Export CSV</Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    className="w-full bg-card/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all focus:bg-card"
                    placeholder="Search by filename, title, or value..."
                />
            </div>

            {/* Table */}
            <div className="border border-border rounded-xl bg-card/50 overflow-hidden backdrop-blur-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-zinc-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Document</th>
                            <th className="px-6 py-4">Generated Title</th>
                            <th className="px-6 py-4">Tags</th>
                            <th className="px-6 py-4">Confidence</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {mockMetadata.map((row, i) => (
                            <motion.tr
                                key={row.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="hover:bg-muted/30 transition-colors group"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded bg-blue-500/10 text-blue-400">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-zinc-200">{row.file}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-300">{row.title}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {row.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center gap-1">
                                                <Hash className="w-3 h-3 text-zinc-500" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${row.confidence > 0.9 ? 'bg-green-500' : row.confidence > 0.7 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                style={{ width: `${row.confidence * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-zinc-500">{(row.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${row.status === 'Verified' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            row.status === 'Needs Review' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                'bg-red-500/10 text-red-500 border-red-500/20'
                                        }`}>
                                        {row.status === 'Verified' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
