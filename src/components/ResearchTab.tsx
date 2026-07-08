import React, { useState } from "react";
import { 
  tickerResearchData, 
  gammaCurveData 
} from "../data";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine 
} from "recharts";
import { 
  Compass, 
  TrendingUp, 
  FileText, 
  TrendingDown, 
  Zap, 
  BarChart, 
  ChevronRight, 
  Cpu, 
  Hash, 
  Gauge 
} from "lucide-react";

export default function ResearchTab() {
  const [selectedTicker, setSelectedTicker] = useState("BTC");
  const activeAsset = tickerResearchData.find(t => t.ticker === selectedTicker) || tickerResearchData[0];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header Section */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-3 mb-3">
          <Gauge className="h-6 w-6 text-indigo-400" />
          <h2 className="text-xl font-bold text-white font-display">퀀트 리서치 허브 (Quant & Options Analytics Hub)</h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          산업 경쟁 구도, 매크로 리스크 할인율, 파생상품 옵션 딜러들의 포지션 및 감마 스케일링을 종합적으로 고려하여 구성한 다차원 정량적 리서치 분석 플랫폼입니다.
          단순한 보도를 넘어, 시장 메이커들의 헤지 메커니즘과 자산군 고유의 밸류에이션 점수를 실시간 도출합니다.
        </p>
      </div>

      {/* 2. Double Column Layout: Ticker Deep Dive & Industrial Situation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Ticker selection panel (4/12) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">분석 대상 종목 리스트</h3>
          <div className="flex flex-col gap-2">
            {tickerResearchData.map((asset) => (
              <button
                key={asset.ticker}
                onClick={() => setSelectedTicker(asset.ticker)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between ${
                  selectedTicker === asset.ticker
                    ? "bg-slate-800 border-indigo-500 shadow-lg text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg font-bold font-mono text-xs ${
                    selectedTicker === asset.ticker ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-300"
                  }`}>
                    {asset.ticker}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{asset.name}</h4>
                    <span className="text-[10px] text-slate-500 block uppercase">{asset.industry}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold">{asset.currentPrice}</div>
                  <span className={`text-[10px] font-mono font-bold ${
                    asset.isPositive ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {asset.change}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Quant Rating Score Panel */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-5 rounded-xl border border-slate-800 text-center">
            <span className="text-xs font-mono text-slate-500 uppercase">ACTIVE ASSET QUANT SCORE</span>
            <div className="text-4xl font-extrabold text-indigo-400 font-display my-2">
              {activeAsset.quantScore}<span className="text-xs text-slate-500">/100</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${activeAsset.quantScore}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              * 정량 점수는 해당 자산의 M2 통화 민감도, DXY 역상관 델타 계수, 파생 감마 집중에 따른 변동성 돌파 강도를 계량화한 알고리즘 점수입니다.
            </p>
          </div>
        </div>

        {/* Right column: Selected Ticker Detail Panel (8/12) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-indigo-400 font-mono uppercase font-bold tracking-widest">{activeAsset.industry}</span>
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2 mt-1">
                {activeAsset.name} ({activeAsset.ticker}) 리서치 보고서
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">실시간 추정가</span>
              <div className="text-lg font-bold text-white font-mono">{activeAsset.currentPrice}</div>
            </div>
          </div>

          {/* 1. Macro & Industrial Context */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-indigo-400" /> 핵심 매크로 및 산업 주도 요인
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeAsset.macroFactors.map((fact, fidx) => (
                <li key={fidx} className="bg-slate-950 p-3 rounded border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans flex flex-col justify-between">
                  <span>{fact}</span>
                  <span className="text-[10px] text-slate-600 block mt-2 text-right font-mono">Factor #{fidx + 1}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Bull Case vs Bear Case (Detailed Paragraphs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-950/20 p-4 rounded-lg border border-emerald-500/20">
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <TrendingUp className="h-4 w-4" /> BULL CASE (강세 시나리오 및 멀티플 근거)
              </h5>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                {activeAsset.bullCase}
              </p>
            </div>
            <div className="bg-red-950/20 p-4 rounded-lg border border-red-500/20">
              <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <TrendingDown className="h-4 w-4" /> BEAR CASE (약세 시나리오 및 리스크 진단)
              </h5>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                {activeAsset.bearCase}
              </p>
            </div>
          </div>

          {/* 3. Technical & Quantitative Assessment */}
          <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="h-4 w-4" /> 실시간 기술적 계량 분석 (Technical & Quant Indicator)
            </h5>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              {activeAsset.technicalAnalysis}
            </p>
          </div>
        </div>

      </div>

      {/* 3. In-Depth Options Segment: Gamma Function Scaling and Gamma Squeeze */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Zap className="h-5 w-5" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold">Options Market Dynamics</span>
          </div>
          <h3 className="text-lg font-bold text-white font-display">파생상품 감마 함수(Gamma Function) 스케일링과 감마 스퀴즈(Gamma Squeeze) 원리</h3>
          <p className="text-xs text-slate-400">옵션 가격 결정식의 2계 도함수 거동 및 시장 조성자의 무차별 매수가 유도하는 지수적 폭등 메커니즘</p>
        </div>

        {/* Conceptual explanation of Options Gamma */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 text-slate-300 text-xs leading-relaxed font-sans">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1.5">1. 옵션 감마(Gamma, Γ)의 수학적 기초</h4>
              <p className="mb-2">
                블랙-숄즈(Black-Scholes) 옵션 가격 결정 모형에서 **감마(Gamma, Γ)**는 기초자산 가격($S$)의 변화에 대한 옵션 **델타(Delta, Δ)**의 변화율을 측정하는 2계 편도함수입니다:
              </p>
              <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center font-mono text-xs text-indigo-300 my-2">
                {"Γ = ∂Δ / ∂S = ∂²V / ∂S² = N'(d₁) / (S · σ · √T)"}
              </div>
              <p>
                여기서 $N'(d_1)$은 표준정규분포의 확률밀도함수(Probability Density Function)를 나타냅니다. 따라서 옵션의 감마 분포는 기초자산 가격의 변화에 따라 완벽한 종형 곡선(Bell Curve)을 그리게 되며, 이는 통계학적 감마 분포(Gamma Distribution) 스케일 및 확률적 비대칭 변동성 스케일을 정밀하게 추종합니다.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-1.5">2. 감마 스퀴즈(Gamma Squeeze)가 발생하는 물리적 경로</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>
                  <strong className="text-indigo-300">콜옵션 매수 집중</strong>: 개인 및 기관 투자자들이 가파른 지상 상승을 예상하고 외가격(OTM) 콜옵션을 대량으로 매수합니다.
                </li>
                <li>
                  <strong className="text-indigo-300">시장조성자(MM)의 숏감마 포지션</strong>: 거래 상대방인 마켓메이커들은 콜옵션을 매도한 상태가 되므로 <span className="text-red-400 font-mono">Short Gamma(숏감마)</span> 포지션에 강제 노출됩니다.
                </li>
                <li>
                  <strong className="text-indigo-300">기계적 현물 매수 가속화</strong>: 현물 가격이 등가격(ATM) 영역인 감마 피크(Gamma Peak) 구간으로 근접할수록, 마켓메이커들이 델타 중립(Delta Neutral) 상태를 유지하기 위해 매입해야 하는 현물의 양(델타 가속도)이 지수적으로 증가합니다.
                </li>
                <li>
                  <strong className="text-indigo-300">피드백 루프 작동</strong>: 마켓메이커들의 헤지 매수가 기초자산 가격을 추가로 견인하고, 이는 다시 그 위의 행사가 옵션들의 델타를 급등시켜 추가 매수를 촉발하는 폭발적인 유동성 숏스퀴즈 순환이 완성됩니다.
                </li>
              </ol>
            </div>
          </div>

          {/* Options Gamma Curve Visualization */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-300">옵션 행사가 인근의 감마 거동 분포선 (K = $70,000)</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono">Gamma Scaling Peak</span>
              </div>
              <div className="h-60 w-full text-[10px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={gammaCurveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGamma" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="price" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                      formatter={(value, name) => [value, "감마 가치(Γ)"]}
                    />
                    <ReferenceLine x={70000} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "ATM Strike K (Max Gamma)", fill: '#ef4444', position: 'top', fontSize: 9 }} />
                    <Area type="monotone" dataKey="gamma" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorGamma)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-400">
              💡 <strong className="text-white">차트 해석:</strong> 기초자산 시세가 행사가 $70,000인 등가격(ATM) 영역에 근접할수록 감마 값은 1.00 최대 피크치로 솟구칩니다. 가격이 $67,000에서 $69,000을 돌파하는 순간 **마켓메이커들의 델타 변화가 가장 격화(가장 기울기가 급함)되어 지수적 감마 스퀴즈 폭발**을 초래하게 됩니다.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
