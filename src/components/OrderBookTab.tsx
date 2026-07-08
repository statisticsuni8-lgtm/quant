import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine 
} from "recharts";
import { coinglassOrderBookData, orderBookWalls } from "../data";
import { 
  Flame, 
  Layers, 
  TrendingUp, 
  Info, 
  Activity, 
  Eye, 
  EyeOff, 
  BarChart2, 
  ShieldCheck 
} from "lucide-react";

export default function OrderBookTab() {
  const [showBuyWalls, setShowBuyWalls] = useState(true);
  const [showSellWalls, setShowSellWalls] = useState(true);
  const [activeWallId, setActiveWallId] = useState<number | null>(null);

  // Combine candlesticks with orderbook visualization.
  // We'll map coinglassData to a format suitable for Recharts
  const chartData = coinglassOrderBookData.map(d => ({
    ...d,
    price: d.close,
    highVal: d.high,
    lowVal: d.low
  }));

  // Find the max price and min price in the data to set a nice YAxis domain
  const prices = chartData.map(d => d.price);
  const minPrice = Math.min(...prices) - 800;
  const maxPrice = Math.max(...prices) + 1200;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header Section */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-4 md:mb-0 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Layers className="h-5 w-5" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold">Liquidity Order Book Depth</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">코인글래스 스타일 실시간 매수벽/매도벽 오버레이 차트</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            가상자산 및 선물 거래소들의 누적 호가 잔량(Cumulative Limit Orders)을 시각화하여 현재 어떤 가격대에서 지지벽과 매도벽이 가격을 '인력(Gravity)'처럼 가두고 있는지 판단합니다.
          </p>
        </div>

        {/* Toggle Switches */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowSellWalls(!showSellWalls)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              showSellWalls 
                ? "bg-red-500/10 text-red-400 border-red-500/30" 
                : "bg-slate-950 text-slate-500 border-slate-800"
            }`}
          >
            {showSellWalls ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span>{showSellWalls ? "매도벽(Asks) 표시 중" : "매도벽 숨김"}</span>
          </button>
          
          <button
            onClick={() => setShowBuyWalls(!showBuyWalls)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              showBuyWalls 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                : "bg-slate-950 text-slate-500 border-slate-800"
            }`}
          >
            {showBuyWalls ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span>{showBuyWalls ? "매수벽(Bids) 표시 중" : "매수벽 숨김"}</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Chart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart Column (8/12) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-slate-950/80 px-2 py-1 rounded text-[10px] text-slate-400 border border-slate-800 font-mono z-10 flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
            LIVE LIQUIDATION WALLS
          </div>

          <h3 className="text-sm font-bold text-white font-display mb-4 flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-emerald-400" /> BTC/USDT 1시간 봉 시세 흐름 & 딜러 호가벽 중첩
          </h3>

          <div className="h-96 w-full font-mono text-[10px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: -5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[69000, 75000]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  formatter={(value, name) => {
                    if (name === "price") return [`$${value}`, "BTC 종가"];
                    return [value, name];
                  }}
                />
                
                {/* Area Background Gradient for Price Chart */}
                <Area type="monotone" dataKey="price" fill="#3b82f6" fillOpacity={0.03} stroke="none" />

                {/* Price Line */}
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3, fill: '#3b82f6' }} activeDot={{ r: 6 }} name="price" />

                {/* Sell Walls Reference Lines (Asks) */}
                {showSellWalls && orderBookWalls.filter(w => w.type === "sell").map((w, idx) => (
                  <ReferenceLine 
                    key={`sell-${idx}`}
                    y={w.price} 
                    stroke={`rgba(239, 68, 68, ${0.1 + w.intensity * 0.45})`}
                    strokeWidth={w.intensity * 5}
                    strokeDasharray="4 2"
                    label={{ 
                      value: `🔴 매도 저항벽 $${w.price} (${w.volume})`, 
                      fill: '#ef4444', 
                      position: 'insideBottomLeft', 
                      fontSize: 9,
                      fontWeight: 'bold',
                      offset: 5
                    }} 
                  />
                ))}

                {/* Buy Walls Reference Lines (Bids) */}
                {showBuyWalls && orderBookWalls.filter(w => w.type === "buy").map((w, idx) => (
                  <ReferenceLine 
                    key={`buy-${idx}`}
                    y={w.price} 
                    stroke={`rgba(16, 185, 129, ${0.1 + w.intensity * 0.45})`}
                    strokeWidth={w.intensity * 5}
                    strokeDasharray="4 2"
                    label={{ 
                      value: `🟢 강력 매수 지지벽 $${w.price} (${w.volume})`, 
                      fill: '#10b981', 
                      position: 'insideTopLeft', 
                      fontSize: 9,
                      fontWeight: 'bold',
                      offset: 5
                    }} 
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Info Sidebar (4/12) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
            <Flame className="h-4 w-4 text-red-400" /> 실시간 주요 매수/매도 장벽 분석
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            오른쪽 차트 상의 점선 밴드의 두께는 해당 호가에 예치된 누적 자금 규모와 강도를 정량화한 수치입니다. 가격이 이 영역에 도달 시 폭발적인 숏커버링 혹은 강한 저항 튕김이 일어납니다.
          </p>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {orderBookWalls.map((wall, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveWallId(idx)}
                onMouseLeave={() => setActiveWallId(null)}
                className={`p-3.5 rounded-xl border transition-all duration-150 ${
                  activeWallId === idx 
                    ? "bg-slate-800 border-slate-700 shadow-md"
                    : "bg-slate-900/60 border-slate-800/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    wall.type === "sell" 
                      ? "bg-red-500/10 text-red-400 border border-red-500/10" 
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                  }`}>
                    {wall.type === "sell" ? "매도벽 (ASK)" : "매수벽 (BID)"}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-slate-200">
                    {wall.volume}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-mono font-black text-white">${wall.price.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-500 font-mono">가중강도: {Math.round(wall.intensity * 100)}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      wall.type === "sell" ? "bg-red-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${wall.intensity * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-sans">{wall.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Education Box */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans space-y-1.5">
        <h4 className="font-bold text-white flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-400" /> 코인글래스 매수/매도 장벽과 유동성 포획(Liquidity Sweep) 매매 프로토콜
        </h4>
        <p>
          전문 퀀트 헤지펀드들은 단순 보조지표가 아닌 거래소들의 **실시간 호가 벽(Order Book Walls)**을 추적하여 유효 가격대를 산출합니다. 
          호가창에 예치된 거대 자금은 단기 트레이더들의 손절 물량(Stop-loss Liquidation)이 대량 중첩되는 지점이기도 합니다. 
          가격이 이 장벽을 강한 볼륨과 함께 상향 돌파 시, 마켓 메이커와 숏포지션 딜러들의 매입(감마 스퀴즈 및 숏스퀴즈)이 동시다발적으로 밀려들며 가격이 순간적으로 폭등하는 '호가 진공' 현상이 유발됩니다. 
          반대로 돌파 실패 시 장벽 인근에서 강하게 자금이 역풍을 맞으며 고점 반전(Mean Reversion) 매도 신호로 변모합니다.
        </p>
      </div>

    </div>
  );
}
