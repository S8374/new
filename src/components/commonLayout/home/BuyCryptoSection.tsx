import { 
  Flame, 
  Zap, 
  Grid, 
  RotateCcw 
} from "lucide-react";

// Custom icons as fallback (if you prefer SVGs over Lucide)
const HTXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12.74 5.16-2 9-7.19 9-12.74V7z" />
    <path d="M12 12v-2" />
    <path d="M12 16v-2" />
  </svg>
);

const BinanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12.74 5.16-2 9-7.19 9-12.74V7z" />
    <path d="M12 12v-2" />
    <path d="M12 16v-2" />
  </svg>
);

// But for simplicity & consistency, we'll use Lucide + custom colors
// You can replace with real brand SVGs later

const BuyCryptoSection = () => {
  const exchanges = [
    { id: "htx", name: "HTX", color: "from-blue-500 to-cyan-500" },
    { id: "binance", name: "BINANCE", color: "from-orange-500 to-red-500" },
    { id: "okex", name: "OKEX", color: "from-gray-500 to-gray-700" },
    { id: "zb", name: "ZB", color: "from-pink-500 to-rose-500" },
  ];

  // Map icon by exchange
  const getIcon = (id: string) => {
    switch (id) {
      case "htx": return Flame;
      case "binance": return Zap;
      case "okex": return Grid;
      case "zb": return RotateCcw;
      default: return Zap;
    }
  };

  return (
    <div className="bg-[#3B393A] rounded-xl p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-white">Buy Crypto</h2>
        <button className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-medium text-black shadow-md hover:shadow-lg transition-shadow">
          Recommend VPN
        </button>
      </div>

      {/* Exchange Icons */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {exchanges.map(({ id, name, color }) => {
          const Icon = getIcon(id);
          return (
            <div key={id} className="flex flex-col items-center group">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                <Icon size={20} strokeWidth={2} className="text-white" />
              </div>
              <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuyCryptoSection;