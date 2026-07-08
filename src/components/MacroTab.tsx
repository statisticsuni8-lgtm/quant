import React from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  employmentIndicatorsData, 
  electionImpactMatrix, 
  historicalDxyRiskAssetsData, 
  historicalM2Sp500Data 
} from "../data";
import { 
  ArrowDownRight, 
  TrendingUp, 
  Calendar, 
  FileText, 
  AlertCircle, 
  Vote, 
  TrendingDown, 
  Layers 
} from "lucide-react";

export default function MacroTab() {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header & Summary Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Layers className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white font-display">매크로 요약 및 글로벌 연준(Fed) 금리 경로 진단</h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          미 연방준비제도(Fed)가 통화정책 결정에서 가장 우선시하는 두 가지 축은 **물가 안정(인플레이션)**과 **최대 고용(고용률)**입니다. 
          현재 매크로 뉴스와 지표들을 종합했을 때, 서비스 인플레이션의 완고함에도 불구하고 고용 시장의 점진적 완화가 뚜렷해짐에 따라, 
          연준은 차기 FOMC에서 매파적 우려를 경감하고 점진적인 금리 피벗(인하) 주기를 지속할 확률이 우세합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800">
            <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
              <TrendingUp className="h-4 w-4" /> 연준(Fed)의 통화정책 움직임 예상
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              6월 CPI가 2.9%로 예상치에 완벽히 연착륙하며 인플레 통제에 자신감을 보이고 있습니다. 
              비농업 고용이 185K로 골디락스 수준을 입증하고 있어 급격한 경기 후퇴 예방을 위한 선제적 25bp 금리 인하 경로가 연말까지 분기별 1회씩 질서 정연하게 이루어질 것으로 전망됩니다.
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800">
            <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-1.5 mb-2">
              <Globe className="h-4 w-4" /> 글로벌 자산 시장 움직임 예상
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              달러 인덱스(DXY)가 101선 위협을 받으면서 환율 수혜에 따른 글로벌 캐리 트레이드 청산 우려 대신 
              풍부해진 M2 유동성이 비트코인 및 테크 주도 성장주(NVDA, TSLA 등)의 멀티플 상승을 주도하고 있습니다. 
              단기 국채에서 빠져나온 머니마켓펀드(MMF) 대기 자금이 주식/암호화폐 시장의 강력한 유동성 방어벽을 구축하는 형국입니다.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Employment Indicators Table (investing.com vs Actuals and Meanings) */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-emerald-400" />
            <div>
              <h3 className="text-lg font-bold text-white font-display">노동/고용 시장 핵심 3대 지표 분석표</h3>
              <p className="text-xs text-slate-400 font-mono">Source: BLS & Investing.com Forecast vs. Actual</p>
            </div>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2.5 py-1 rounded">
            Latest: July 2026
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/40 text-slate-400 text-xs font-mono border-b border-slate-800">
                <th className="py-3 px-4">주요 경제 지표</th>
                <th className="py-3 px-4 text-center">예상치 (Forecast)</th>
                <th className="py-3 px-4 text-center">발표치 (Actual)</th>
                <th className="py-3 px-4 text-center">이전치 (Previous)</th>
                <th className="py-3 px-4">매크로적 의미 및 시장 영향 (Significance)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {employmentIndicatorsData.map((ind) => (
                <tr key={ind.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">
                    {ind.name}
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded font-mono">
                      {ind.indicatorKey}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-slate-400">{ind.forecast}</td>
                  <td className="py-4 px-4 text-center font-mono">
                    <span className={`px-2 py-1 rounded font-bold ${
                      ind.status === 'better' 
                        ? "bg-emerald-500/10 text-emerald-400" 
                        : ind.status === 'worse' 
                          ? "bg-red-500/10 text-red-400" 
                          : "bg-blue-500/10 text-blue-400"
                    }`}>
                      {ind.actual}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-slate-500">{ind.previous}</td>
                  <td className="py-4 px-4">
                    <div className="text-slate-300 text-xs leading-relaxed mb-1 font-sans">
                      {ind.significance}
                    </div>
                    <div className="text-[11px] text-slate-400 font-serif italic">
                      💡 해석: {ind.meaningKorean}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Charts Grid - Relationship Simulations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart A: Dollar Index (DXY) vs Bitcoin */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-md font-bold text-white font-display">달러 인덱스(DXY) 하락과 위험 자산 유입 상관관계</h4>
              <p className="text-xs text-slate-400">달러 가치 하락 시 비트코인 가치의 역상관 가격 펌핑 시뮬레이션</p>
            </div>
            <ArrowDownRight className="h-5 w-5 text-red-400" />
          </div>
          <div className="h-80 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalDxyRiskAssetsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDxy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis yAxisId="left" orientation="left" stroke="#ef4444" domain={[100, 105]} label={{ value: 'DXY', angle: -90, position: 'insideLeft', fill: '#ef4444' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" domain={[35000, 75000]} label={{ value: 'BTC ($)', angle: 90, position: 'insideRight', fill: '#10b981' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="DXY" stroke="#ef4444" fillOpacity={1} fill="url(#colorDxy)" strokeWidth={2} name="달러 인덱스(DXY)" />
                <Area yAxisId="right" type="monotone" dataKey="BTC" stroke="#10b981" fillOpacity={1} fill="url(#colorBtc)" strokeWidth={2} name="비트코인 시세 (BTC)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-slate-950/50 rounded border border-slate-800 text-xs text-slate-400">
            📌 <strong className="text-white">퀀트 리서치 분석:</strong> 달러 가치의 하락(DXY 하방 돌파)은 글로벌 실물화폐에 대한 불신과 통화 이격 조정을 자극합니다. 피하기 힘든 현금 가치 절하에 대응하여 유동성은 가장 전방의 초고위험 희소 자산(비트코인, 하이파이 테크성장주)으로 최우선 이동하는 패러다임을 증명합니다.
          </div>
        </div>

        {/* Chart B: US M2 Money Supply vs S&P 500 */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-md font-bold text-white font-display">M2 통화 공급량 증대와 S&P 500 자산 지수 펌핑</h4>
              <p className="text-xs text-slate-400">시스템 통화 가치 팽창에 따른 자산 가격 정비례 동행 지표</p>
            </div>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="h-80 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalM2Sp500Data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" domain={[20.0, 22.5]} label={{ value: 'M2 통화량 (조 달러)', angle: -90, position: 'insideLeft', fill: '#3b82f6' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" domain={[4500, 6000]} label={{ value: 'S&P 500 (pt)', angle: 90, position: 'insideRight', fill: '#8b5cf6' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="M2" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} name="미 M2 통화량" />
                <Line yAxisId="right" type="monotone" dataKey="SP500" stroke="#8b5cf6" strokeWidth={3} name="S&P 500 지수" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-slate-950/50 rounded border border-slate-800 text-xs text-slate-400">
            📌 <strong className="text-white">유동성 펌핑 메커니즘:</strong> 금융 시스템에 M2(통화유통량) 공급이 가속화되면 신용 승수가 팽창하여 국채 실질 금리가 하락합니다. 자본 비용이 저렴해진 대형 자산운용사와 상업 은행들은 화폐 가치 절하를 방어하기 위해 우량 다국적 지수(S&P 500, Nasdaq) 주식을 바스켓 단위로 대량 편입하며, 자산군 펌핑 랠리가 발생합니다.
          </div>
        </div>

      </div>

      {/* 4. 2026 US Midterm Election Special Analysis */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <Vote className="h-6 w-6 text-purple-400" />
            <div>
              <h3 className="text-lg font-bold text-white font-display">2026년 11월 미국 중간선거 예측 및 자산군 시나리오</h3>
              <p className="text-xs text-slate-400">폴리마켓(Polymarket) 실시간 승률 & 양당 의회 장악 시 시뮬레이션</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            Polymarket Odds Active Track
          </div>
        </div>

        {/* Polymarket Probabilities Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-950 p-6 rounded-lg border border-slate-800">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-red-400 flex items-center gap-1">🔴 공화당 (Republican Party) 승리 확률</span>
              <span className="font-mono text-red-400 text-base font-bold">56%</span>
            </div>
            <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-1000" style={{ width: "56%" }}></div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-2">
              감세 정책 연장, 기후 보조금 규제 해제, 그리고 가상자산에 전향적인 스탠스로 글로벌 금융 딜러들의 투기 수요와 폴리마켓 고래들의 자금이 강하게 쏠리고 있습니다.
            </p>
          </div>
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-blue-400 flex items-center gap-1">🔵 민주당 (Democratic Party) 승리 확률</span>
              <span className="font-mono text-blue-400 text-base font-bold">44%</span>
            </div>
            <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000" style={{ width: "44%" }}></div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-2">
              재생에너지 중심 정책 견지, 연착륙 기반 안정적인 인프라 지출 유지로 정부 정책 불확실성을 최소화하려는 전통 기관 펀드 패시브 자금이 안정세로 지지하고 있습니다.
            </p>
          </div>
        </div>

        {/* Scenario Impact Cards */}
        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider font-mono">양당 승리 시 자산군별 영향 전망 (Quant Valuation Matrix)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {electionImpactMatrix.map((item, idx) => (
            <div key={idx} className="bg-slate-950/70 rounded-lg p-4 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <span className="text-xs text-slate-400 font-mono block mb-2 border-b border-slate-800 pb-1.5 uppercase">
                  {item.assetClass}
                </span>
                
                {/* Republican */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-red-400 font-bold">공화당 승리 시</span>
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                      {item.republicanScenario.outlook}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed font-sans">
                    {item.republicanScenario.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.republicanScenario.targetSectors.map((s, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-red-950/40 text-red-300/80 px-1.5 py-0.5 rounded font-sans">
                        +{s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Democratic */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-blue-400 font-bold">민주당 승리 시</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                      {item.democraticScenario.outlook}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed font-sans">
                    {item.democraticScenario.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.democraticScenario.targetSectors.map((s, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-blue-950/40 text-blue-300/80 px-1.5 py-0.5 rounded font-sans">
                        +{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// Inline missing Globe icon to satisfy tsx compiles
function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
