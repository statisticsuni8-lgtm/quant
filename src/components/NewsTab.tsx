import React, { useState, useEffect } from "react";
import { 
  Globe, 
  Search, 
  Sparkles, 
  Cpu, 
  Layers, 
  AlertCircle, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  FileText 
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  ticker: string;
  timestamp: string;
  source: string;
  impact: string;
}

export default function NewsTab() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  
  // AI summarization states
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isRealAI, setIsRealAI] = useState<boolean | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const categories = ["All", "Geopolitics", "Macro", "Labor", "Election", "Research"];

  // Reassuring messages during AI summarization loading state
  const loadingMessages = [
    "Gemini 3.5 Flash 모델이 거시경제적 물가 맥락을 종합 분석 중입니다...",
    "중국-대만 지정학적 반도체 긴장 및 트럼프-이란 비공식 원유 협상 임팩트를 결합하고 있습니다...",
    "달러 인덱스 하락 대비 M2 통화 팽창 수혜 대상 자산군을 필터링 중입니다...",
    "파생 상품 콜옵션 감마 스퀴즈 임계점과 숏커버 유발 강도를 산출하는 중입니다...",
    "우리 포트폴리오를 위한 최적의 거시경제 퀀트 브리핑 문건을 편찬하고 있습니다..."
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSummarizing) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isSummarizing]);

  const fetchNews = async () => {
    setIsLoadingNews(true);
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        setNews(data);
        // Automatically trigger AI summary generation on initial load
        generateAISummary(data);
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setIsLoadingNews(false);
    }
  };

  const generateAISummary = async (filteredNewsList: NewsArticle[]) => {
    setIsSummarizing(true);
    setAiSummary(null);
    setLoadingStep(0);
    
    try {
      const res = await fetch("/api/news/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: categoryFilter,
          keyword: searchKeyword,
          customNews: filteredNewsList
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.isError && data.fallbackSummary) {
          setAiSummary(data.fallbackSummary);
          setIsRealAI(false);
        } else {
          setAiSummary(data.summary);
          setIsRealAI(data.isRealAI);
        }
      } else {
        setAiSummary("서버 오류로 인해 AI 요약을 받아오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error("Failed to generate AI summary:", err);
      setAiSummary("네트워크 연결 실패로 실 실시간 요약을 가져올 수 없습니다.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const filteredNews = news.filter((n) => {
    const matchesCategory = categoryFilter === "All" || n.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesKeyword = searchKeyword === "" || 
      n.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      n.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      n.ticker.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesKeyword;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Dashboard Filter Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <Globe className="h-5 w-5 text-emerald-400" />
            <div>
              <h2 className="text-md font-bold text-white font-display">실시간 리서치 필터링 콘솔</h2>
              <p className="text-xs text-slate-400">지정학, 거시경제 유동성 이슈, 미 중간선거 물줄기를 실시간 큐레이션합니다.</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-500" />
            </span>
            <input
              type="text"
              placeholder="티커, 뉴스 제목, 내용 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-1.5 border-t border-slate-800/60 pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                categoryFilter === cat
                  ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                  : "bg-slate-950 text-slate-500 hover:text-slate-300 border border-transparent"
              }`}
            >
              {cat === "All" ? "전체 뉴스" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Primary AI Action Trigger Card */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-blue-950/40 border border-emerald-500/30 p-6 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-mono font-bold">
              <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Real-time Gemini Intelligence</span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              현재 필터링된 뉴스를 기반으로 실시간 AI 거시경제 연구 브리핑서 편찬
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              중국 대만 관련 테크 반도체 병목 충격, 트럼프 이란 수혜 자산군, 고용 지표(NFP, 실업률)와 달러 하락(DXY) 및 M2 증가의 복합 연결고리를 실시간으로 종합 요약 및 분석합니다.
            </p>
          </div>

          <button
            onClick={() => generateAISummary(filteredNews)}
            disabled={isSummarizing || filteredNews.length === 0}
            className={`shrink-0 flex items-center justify-center space-x-2.5 px-6 py-4 rounded-xl text-sm font-bold shadow-xl transition-all ${
              filteredNews.length === 0
                ? "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700"
                : isSummarizing
                  ? "bg-slate-800 text-slate-400 border border-slate-700 animate-pulse"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white cursor-pointer hover:shadow-emerald-500/20"
            }`}
          >
            {isSummarizing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>AI 브리핑 보고서 생성 중...</span>
              </>
            ) : (
              <>
                <Cpu className="h-4 w-4" />
                <span>실시간 AI 필터링 & 요약 브리핑 생성</span>
              </>
            )}
          </button>
        </div>

        {/* AI Loading State Panel */}
        {isSummarizing && (
          <div className="mt-6 bg-slate-950/80 p-5 rounded-lg border border-slate-800 text-center space-y-3 animate-pulse">
            <div className="flex justify-center">
              <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin" />
            </div>
            <p className="text-xs font-mono text-emerald-400 tracking-wide">
              {loadingMessages[loadingStep]}
            </p>
            <div className="w-48 mx-auto bg-slate-900 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* AI Summary Output Panel */}
        {aiSummary && !isSummarizing && (
          <div className="mt-6 bg-slate-950 p-6 rounded-lg border border-emerald-500/30 shadow-2xl space-y-4 animate-fade-in relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">AI Generated Macro Executive Briefing</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isRealAI 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}>
                {isRealAI ? "🔴 LIVE API ACTIVE" : "🛡️ FALLBACK SIMULATION MODE"}
              </span>
            </div>

            {/* Render formatted blocks of summary */}
            <div className="text-xs text-slate-300 leading-relaxed font-sans space-y-4 overflow-y-auto max-h-[30rem] pr-1">
              {aiSummary.split("\n\n").map((para, pIdx) => {
                if (para.startsWith("###")) {
                  return (
                    <h4 key={pIdx} className="text-sm font-bold text-white font-display border-b border-slate-800 pb-1 pt-3">
                      {para.replace("###", "").trim()}
                    </h4>
                  );
                }
                if (para.startsWith("####")) {
                  return (
                    <h5 key={pIdx} className="text-xs font-bold text-emerald-400 font-display pt-2 uppercase tracking-wide">
                      {para.replace("####", "").trim()}
                    </h5>
                  );
                }
                if (para.startsWith("* **")) {
                  return (
                    <div key={pIdx} className="pl-3 border-l border-emerald-500/30">
                      <p>{para.trim()}</p>
                    </div>
                  );
                }
                return <p key={pIdx}>{para}</p>;
              })}
            </div>

            {/* API Warning/Notice in compliance with security guidelines */}
            {!isRealAI && (
              <div className="mt-4 p-3.5 bg-slate-900 border border-slate-800 rounded-md flex gap-2.5 items-start text-[10px] text-slate-400 font-mono">
                <AlertCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">API 키 보안 안내:</strong> 현재 서버의 실시간 Gemini API Key가 기본 설정이거나 공란 상태입니다. 
                  우측 상단의 <strong className="text-emerald-400">설정(Settings) &gt; 암호(Secrets)</strong> 패널에서 <strong className="text-emerald-400">GEMINI_API_KEY</strong>를 여러분의 개인 API 키로 주입하시면, 
                  완전한 독립적 연동을 통해 실시간 뉴스 데이터를 실제 인공지능이 무제한으로 맞춤 필터링 및 요약하는 최상위 프로토콜이 가동됩니다.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. News Feed Container */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
          <FileText className="h-4 w-4" /> 리서치 종합 매크로 뉴스 피드 ({filteredNews.length}개)
        </h3>

        {isLoadingNews ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center animate-pulse">
            <RefreshCw className="h-8 w-8 text-slate-600 animate-spin mx-auto mb-2" />
            <span className="text-slate-500 text-xs font-mono">시뮬레이션 뉴스 데이터베이스 동기화 중...</span>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-500 text-xs">
            검색 결과 및 필터 범주에 부합하는 뉴스가 없습니다. 검색어를 다시 수정해 주세요.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((n) => (
              <div 
                key={n.id}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-950 text-indigo-400 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-wide border border-indigo-950/40">
                      {n.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(n.timestamp).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug hover:text-indigo-300 transition-colors">
                    {n.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {n.content}
                  </p>
                </div>

                <div className="border-t border-slate-850 pt-3 flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-600">관련 자산:</span>
                    <span className="text-indigo-400 bg-indigo-950/20 px-1.5 py-0.5 rounded border border-indigo-900/10 font-bold">
                      {n.ticker}
                    </span>
                  </div>
                  <span className={`font-bold px-1.5 py-0.5 rounded ${
                    n.impact.includes("Bullish") 
                      ? "text-emerald-400 bg-emerald-500/10" 
                      : n.impact.includes("Bearish") 
                        ? "text-red-400 bg-red-500/10" 
                        : "text-slate-400 bg-slate-950"
                  }`}>
                    {n.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
