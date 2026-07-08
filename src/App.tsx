import React, { useState } from "react";
import Navigation from "./components/Navigation";
import NewsTab from "./components/NewsTab";
import MacroTab from "./components/MacroTab";
import ResearchTab from "./components/ResearchTab";
import OrderBookTab from "./components/OrderBookTab";
import CalendarTab from "./components/CalendarTab";
import { Cpu, Mail, Globe, Layers } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("news");

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      
      {/* Navigation Top Bar */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === "news" && <NewsTab />}
        {activeTab === "macro" && <MacroTab />}
        {activeTab === "research" && <ResearchTab />}
        {activeTab === "orderbook" && <OrderBookTab />}
        {activeTab === "calendar" && <CalendarTab />}
      </main>

      {/* Premium Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 mt-12 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-emerald-500" />
            <span className="text-slate-300 font-display font-bold">QUANT RESEARCH PLATFORM</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span>Powered by</span>
            <span className="text-indigo-400 font-bold">Gemini 3.5 Flash</span>
            <span>&</span>
            <span className="text-emerald-400 font-bold">Express Engine</span>
          </div>
          <div className="text-slate-600">
            © 2026 Quant Research. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
