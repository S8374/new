import { RotateCcw } from 'lucide-react';

const BalanceHeader = () => {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-1 flex items-center justify-between shadow-sm">
      {/* Left: Token + Balance */}
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <span className="text-white font-medium text-sm">0.00</span>
      </div>

      {/* Middle: Refresh */}
      <button className="p-2 rounded-full hover:bg-gray-600 transition-colors">
        <RotateCcw size={20} className="text-gray-300" />
      </button>

      {/* Right: Deposit Button */}
      <button className="px-1 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg font-semibold text-white text-sm shadow-md hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
        Deposit
      </button>
    </div>
  );
};

export default BalanceHeader;