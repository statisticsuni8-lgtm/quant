import React, { useState } from "react";
import { calendarEventsData } from "../data";
import { 
  Calendar, 
  Clock, 
  Info, 
  SlidersHorizontal, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle 
} from "lucide-react";

export default function CalendarTab() {
  const [importanceFilter, setImportanceFilter] = useState("All");

  const filteredEvents = importanceFilter === "All"
    ? calendarEventsData
    : calendarEventsData.filter(e => e.importance === importanceFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Description Header */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-4 md:mb-0 space-y-1">
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-400" /> 핵심 매크로 경제 캘린더
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            글로벌 시장과 유동성 흐름을 좌우하는 주요 미연방 경제지표 및 인플레이션 공개 일정을 직접 확인하고 대응 전략을 수립할 수 있습니다.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-mono">중요도 필터:</span>
          <div className="flex bg-slate-950 p-1 rounded-md border border-slate-800 text-xs">
            {["All", "High", "Medium"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setImportanceFilter(lvl)}
                className={`px-3 py-1.5 rounded transition-all ${
                  importanceFilter === lvl
                    ? "bg-slate-800 text-white font-bold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {lvl === "All" ? "전체" : lvl === "High" ? "고(High)" : "중(Medium)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Economic Calendar Grid / Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-400" /> 주간 주요 캘린더 일정 (2026년 7월 첫째주)
          </div>
          <span className="text-[11px] text-slate-500 font-mono">한국 시간(KST) 기준</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="p-5 hover:bg-slate-800/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Column: Time & Country & Importance */}
              <div className="flex items-start md:items-center space-x-4 min-w-[200px]">
                <div className="text-xs text-slate-400 space-y-1">
                  <div className="font-mono text-white flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-500" /> {ev.time.split(" ")[1]}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">{ev.time.split(" ")[0]}</div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-semibold">
                    {ev.country}
                  </span>
                  
                  <span className={`block text-[10px] uppercase font-mono tracking-widest ${
                    ev.importance === "High" 
                      ? "text-red-400 font-bold" 
                      : ev.importance === "Medium" 
                        ? "text-blue-400" 
                        : "text-slate-500"
                  }`}>
                    {ev.importance === "High" ? "🔥🔥 중요도 고" : "🔥 중요도 중"}
                  </span>
                </div>
              </div>

              {/* Middle Column: Event Title & Affected Asset */}
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-bold text-white leading-snug">{ev.event}</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 font-mono">영향 자산군:</span>
                  <span className="text-[10px] text-indigo-400 font-mono bg-indigo-950/40 px-1.5 py-0.5 rounded border border-indigo-500/10 font-bold">
                    {ev.impactTicker}
                  </span>
                </div>
              </div>

              {/* Right Column: Numbers (Forecast, Previous, Actual) */}
              <div className="grid grid-cols-3 gap-6 text-center text-xs font-mono min-w-[250px] bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase mb-1">예상치</span>
                  <span className="text-slate-300 font-bold">{ev.forecast}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase mb-1">발표치</span>
                  <span className={`font-bold ${
                    ev.actual === "---" 
                      ? "text-slate-600" 
                      : ev.actual === ev.forecast 
                        ? "text-blue-400" 
                        : "text-emerald-400"
                  }`}>{ev.actual}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase mb-1">이전치</span>
                  <span className="text-slate-500">{ev.previous}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 3. Operational Protocol Tip */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex gap-3 text-xs text-slate-400 leading-relaxed font-sans">
        <Info className="h-5 w-5 text-indigo-400 shrink-0" />
        <div>
          <strong className="text-white">프로토콜 정보:</strong> 미국 소비자물가지수(CPI)와 신규 실업수당 청구 건수 등 중요 캘린더 발표 30분 전후로는 마켓메이커들이 옵션 감마 델타 조정 헤징을 일시 정지하거나 매수/매도 호가 갭(Spread)을 인위적으로 확대하여 호가 공백이 발생할 수 있습니다. 퀀트 포트폴리오 운용 시 발표 직전 무리한 옵션 포지션 진입을 삼가고 방향성이 설정된 이후 돌파 감마 스퀴즈에 승차하는 전략이 최우선시됩니다.
        </div>
      </div>

    </div>
  );
}
