import React, { useState, useEffect } from "react";
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
import { 
  Flame, 
  Layers, 
  TrendingUp, 
  Info, 
  Activity, 
  Eye, 
  EyeOff, 
  BarChart2, 
  ShieldCheck, 
  RefreshCw,
  TrendingDown,
  Compass,
  Zap
} from "lucide-react";

// Supported high-volume index cryptos on Hyperliquid
const AVAILABLE_COINS = ["BTC", "ETH", "SOL", "XRP", "SUI", "ARB", "OP"];

export default function OrderBookTab() {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [showBuyWalls, setShowBuyWalls] = useState(true);
  const [showSellWalls, setShowSellWalls] = useState(true);
  const [activeWallId, setActiveWallId] = useState<number | null>(null);

  // Real-time fetched states from Hyperliquid
  const [candles, setCandles] = useState<any[]>([]);
  const [walls, setWalls] = useState<any[]>([]);
  const [allPrices, setAllPrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch all mid prices to populate index feed
  const fetchAllPrices = async () => {
    try {
      const res = await fetch("/api/hyperliquid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "allMids" })
      });
      if (res.ok) {
        const mids = await res.json();
        const parsed: Record<string, number> = {};
        for (const [coin, px] of Object.entries(mids)) {
          parsed[coin] = parseFloat(px as string);
        }
        setAllPrices(parsed);
      }
    } catch (err) {
      console.error("Failed to fetch all mids:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const endTime = Date.now();
        // 36 hours range for a highly dense and beautiful chart
        const startTime = endTime - 36 * 60 * 60 * 1000;

        // 1. Fetch historical candle snapshot from Hyperliquid
        const candleRes = await fetch("/api/hyperliquid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "candleSnapshot",
            req: {
              coin: selectedCoin,
              interval: "1h",
              startTime,
              endTime
            }
          })
        });

        // 2. Fetch orderbook depth (L2 Book) from Hyperliquid
        const bookRes = await fetch("/api/hyperliquid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "l2Book",
            coin: selectedCoin
          })
        });

        if (!isMounted) return;

        let parsedCandles: any[] = [];
        if (candleRes.ok) {
          const rawCandles = await candleRes.json();
          if (Array.isArray(rawCandles)) {
            parsedCandles = rawCandles
              .map(c => ({
                timestamp: c.t,
                time: new Date(c.t).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" }) + " " + new Date(c.t).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
                open: parseFloat(c.o),
                high: parseFloat(c.h),
                low: parseFloat(c.l),
                close: parseFloat(c.c),
                price: parseFloat(c.c),
                volume: parseFloat(c.v)
              }))
              .sort((a, b) => a.timestamp - b.timestamp);
          }
        }

        let parsedWalls: any[] = [];
        if (bookRes.ok) {
          const book = await bookRes.json();
          if (book && book.levels && Array.isArray(book.levels)) {
            const bids = book.levels[0] || [];
            const asks = book.levels[1] || [];

            // Find top buy walls (bids with largest sizes)
            const sortedBids = [...bids].sort((a, b) => parseFloat(b.sz) - parseFloat(a.sz));
            const topBids = sortedBids.slice(0, 4);

            // Find top sell walls (asks with largest sizes)
            const sortedAsks = [...asks].sort((a, b) => parseFloat(b.sz) - parseFloat(a.sz));
            const topAsks = sortedAsks.slice(0, 4);

            const maxBidSz = Math.max(...topBids.map(b => parseFloat(b.sz)), 1);
            const maxAskSz = Math.max(...topAsks.map(a => parseFloat(a.sz)), 1);

            const buyWalls = topBids.map(b => {
              const price = parseFloat(b.px);
              const sz = parseFloat(b.sz);
              return {
                price,
                type: "buy",
                volume: `${sz.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${selectedCoin}`,
                intensity: sz / maxBidSz,
                description: `실시간 누적 호가 집중 매수 지지벽`
              };
            });

            const sellWalls = topAsks.map(a => {
              const price = parseFloat(a.px);
              const sz = parseFloat(a.sz);
              return {
                price,
                type: "sell",
                volume: `${sz.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${selectedCoin}`,
                intensity: sz / maxAskSz,
                description: `실시간 누적 호가 집중 매도 저항벽`
              };
            });

            parsedWalls = [...sellWalls, ...buyWalls];
          }
        }

        if (parsedCandles.length > 0) {
          setCandles(parsedCandles);
        }
        setWalls(parsedWalls);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Failed to fetch Hyperliquid real-time data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchAllPrices();

    const interval = setInterval(() => {
      fetchData();
      fetchAllPrices();
    }, 5000); // 5-second ultra-responsive polling

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedCoin]);

  // Dynamic YAxis margins based on loaded candles
  const prices = candles.map(d => d.close);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const pad = (maxPrice - minPrice) * 0.15 || 100;
  const yAxisDomain = prices.length > 0 ? [minPrice - pad, maxPrice + pad] : [60000, 75000];

  return (
    <div className="space-y-8 animate-fade-in" id="order-book-root">
      
      {/* Real-time Index Ticker Tape */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 flex items-center justify-between overflow-x-auto gap-4 scrollbar-thin">
        <div className="flex items-center space-x-2 shrink-0">
          <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400 tracking-wider font-bold">HYPERLIQUID INDEX FEED:</span>
        </div>
        <div className="flex items-center space-x-6">
          {AVAILABLE_COINS.map(coin => {
            const price = allPrices[coin];
            return (
              <div 
                key={coin} 
                onClick={() => setSelectedCoin(coin)}
                className={`flex items-center space-x-2 cursor-pointer transition-all px-2.5 py-1 rounded-md ${
                  selectedCoin === coin 
                    ? "bg-slate-800 border border-slate-700 font-bold scale-105 text-white" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <span className="text-xs font-mono font-bold">{coin}</span>
                <span className="text-xs font-mono text-slate-100">
                  {price ? `$${price.toLocaleString()}` : "Loading..."}
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 shrink-0">
          <RefreshCw className="h-3 w-3 text-slate-500 animate-spin" />
          <span>5초 간격 갱신</span>
        </div>
      </div>

      {/* 1. Header Section */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-4 md:mb-0 space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Layers className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold">Hyperliquid Live Liquidity Tracker</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">하이퍼리퀴드 실시간 매수벽/매도벽 오버레이 차트</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            가상자산 세계 최대 탈중앙화 선물 거래소 하이퍼리퀴드(Hyperliquid)의 누적 오더북 호가 잔량과 실시간 시세를 융합하여 마켓메이커 및 고래들이 설계한 저항 가격대를 정밀 추적합니다.
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
          {isLoading && (
            <div className="absolute inset-0 bg-slate-950/70 z-50 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin" />
              <p className="text-xs text-slate-300 font-mono">하이퍼리퀴드 실시간 오더북 및 시세 동기화 중...</p>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-slate-950/80 px-2 py-1 rounded text-[10px] text-slate-400 border border-slate-800 font-mono z-10 flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span>LIVE LIQUIDATION DEEPEST WALLS</span>
          </div>

          <h3 className="text-sm font-bold text-white font-display mb-4 flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-emerald-400" /> {selectedCoin} 1시간 봉 시세 흐름 & 딜러 호가벽 오버레이
          </h3>

          <div className="h-[28rem] w-full font-mono text-[10px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={candles} margin={{ top: 10, right: -5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={yAxisDomain} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  formatter={(value, name) => {
                    if (name === "price") return [`$${parseFloat(value as string).toLocaleString()}`, `${selectedCoin} 종가`];
                    if (name === "volume") return [parseFloat(value as string).toLocaleString(), "거래량"];
                    return [value, name];
                  }}
                />
                
                {/* Area Background Gradient for Price Chart */}
                <Area type="monotone" dataKey="price" fill="#3b82f6" fillOpacity={0.03} stroke="none" />

                {/* Price Line */}
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="price" />

                {/* Sell Walls Reference Lines (Asks) */}
                {showSellWalls && walls.filter(w => w.type === "sell").map((w, idx) => (
                  <ReferenceLine 
                    key={`sell-${idx}`}
                    y={w.price} 
                    stroke={`rgba(239, 68, 68, ${0.15 + w.intensity * 0.5})`}
                    strokeWidth={w.intensity * 4 + 1}
                    strokeDasharray="4 2"
                    label={{ 
                      value: `🔴 매도벽 $${w.price.toLocaleString()} (${w.volume})`, 
                      fill: '#ef4444', 
                      position: 'insideBottomLeft', 
                      fontSize: 8,
                      fontWeight: 'bold',
                      offset: 5
                    }} 
                  />
                ))}

                {/* Buy Walls Reference Lines (Bids) */}
                {showBuyWalls && walls.filter(w => w.type === "buy").map((w, idx) => (
                  <ReferenceLine 
                    key={`buy-${idx}`}
                    y={w.price} 
                    stroke={`rgba(16, 185, 129, ${0.15 + w.intensity * 0.5})`}
                    strokeWidth={w.intensity * 4 + 1}
                    strokeDasharray="4 2"
                    label={{ 
                      value: `🟢 매수벽 $${w.price.toLocaleString()} (${w.volume})`, 
                      fill: '#10b981', 
                      position: 'insideTopLeft', 
                      fontSize: 8,
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
            <Flame className="h-4 w-4 text-red-400" /> 실시간 주요 호가벽 분석 ({selectedCoin})
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            차트 상에 표시된 점선의 굵기와 아래 강도 막대는 해당 호가에 예치된 실시간 지정가 주문(Limit Orders)의 가중 합산 강도입니다. 가격이 이 영역에 도달 시 강력한 튕김 혹은 돌파 시의 강한 폭발이 전개됩니다.
          </p>

          <div className="space-y-2 max-h-[22rem] overflow-y-auto pr-1">
            {walls.length === 0 ? (
              <div className="text-center p-6 text-slate-500 text-xs font-mono">
                호가벽 데이터를 계산하고 있습니다...
              </div>
            ) : (
              walls.map((wall, idx) => (
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
                    <span className="text-sm font-mono font-black text-white">${wall.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
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
              ))
            )}
          </div>
        </div>

      </div>

      {/* 3. Education Box */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans space-y-1.5">
        <h4 className="font-bold text-white flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-400" /> 하이퍼리퀴드 오더북 분석과 유동성 쓸기(Liquidity Sweep) 매매 전술
        </h4>
        <p>
          하이퍼리퀴드와 같은 초대형 레버리지 파생 상품 거래소에서 **호가 장벽(Liquidity Walls)**은 가격을 끌어당기는 자석 역할을 하는 동시에, 도달 시 강한 수급 소모전이 벌어지는 전장입니다. 
          특히 롱/숏 레버리지 포지션들의 청산 가격(Liquidation Prices)이 이 장벽들의 바로 안쪽이나 바깥쪽에 고밀도로 적층됩니다.
          가격이 이 장벽을 강한 볼륨과 함께 휩쓸고 갈 때(Liquidity Sweep), 일방향 숏커버링(Short-Squeeze) 또는 롱스퀴즈가 도미노처럼 터지며 차트 상에서 대형 캔들이 형성됩니다. 
          본 차트는 이 청산 가속 구간을 미리 포착해 내어 기계적 돌파 승차 또는 강력한 역추세 지점을 선정하는 퀀트들의 전술적 핵심을 제공합니다.
        </p>
      </div>

    </div>
  );
}
