import React from "react";
import { 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  BarChart2, 
  Globe, 
  Award, 
  Cpu
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const navItems = [
    { id: "news", label: "실시간 AI 뉴스 & 요약", icon: Globe },
    { id: "macro", label: "글로벌 매크로 분석", icon: TrendingUp },
    { id: "research", label: "퀀트 리서치 허브", icon: BookOpen },
    { id: "orderbook", label: "코인글래스 매수/매도벽", icon: BarChart2 },
    { id: "calendar", label: "경제 캘린더", icon: Calendar }
  ];

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <div className="bg-gradient-to-tr from-emerald-500 to-blue-600 p-2 rounded-lg flex items-center justify-center">
          <Cpu className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display tracking-tight text-white flex items-center gap-2">
            QUANT RESEARCH <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">PRO</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">Macro Intelligence & Gamma Platform</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
