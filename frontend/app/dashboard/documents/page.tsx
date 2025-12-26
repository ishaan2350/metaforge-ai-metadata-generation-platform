"use client";

import { motion } from "framer-motion";
import { FileText, MoreVertical, Plus, Grid, List as ListIcon, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockDocs = [
    { id: 1, name: "Q3_Financials.pdf", size: "2.4 MB", date: "2 hrs ago", type: "PDF" },
    { id: 2, name: "Employee_Handbook.docx", size: "1.2 MB", date: "5 hrs ago", type: "DOCX" },
    { id: 3, name: "Project_Titan_Specs.pdf", size: "4.8 MB", date: "1 day ago", type: "PDF" },
    { id: 4, name: "Marketing_Plan.pptx", size: "8.5 MB", date: "2 days ago", type: "PPTX" },
    { id: 5, name: "Meeting_Notes_Dec.txt", size: "45 KB", date: "3 days ago", type: "TXT" },
];

export default function DocumentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
                        Documents
                    </h1>
                    <p className="text-zinc-400">View and manage your document repository.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Upload New
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between gap-4 p-1 bg-muted/30 rounded-lg w-fit">
                <Button variant="ghost" size="sm" className="bg-card shadow-sm text-white">
                    <Grid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white">
                    <ListIcon className="w-4 h-4" />
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockDocs.map((doc, i) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative p-4 rounded-2xl bg-card/50 border border-border hover:border-blue-500/50 hover:bg-card/80 transition-all cursor-pointer"
                    >
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-zinc-700/50 rounded">
                                <MoreVertical className="w-4 h-4 text-zinc-400" />
                            </button>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center mb-4 shadow-inner">
                            <FileText className="w-6 h-6 text-blue-400" />
                        </div>

                        <h3 className="font-medium truncate pr-6" title={doc.name}>{doc.name}</h3>

                        <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                            <span className="bg-zinc-800 px-1.5 py-0.5 rounded">{doc.type}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border/50 text-xs text-zinc-500 flex justify-between items-center">
                            <span>{doc.date}</span>
                            <div className="flex -space-x-2">
                                <div className="w-5 h-5 rounded-full bg-blue-500 border border-zinc-900" />
                            </div>
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    className="p-4 rounded-2xl border border-dashed border-zinc-700 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-blue-400"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-medium sm">Upload File</span>
                </motion.div>
            </div>
        </div>
    );
}
