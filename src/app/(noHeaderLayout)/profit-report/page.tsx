import BackButton from '@/components/ui/BackButton';
import { Calendar, TrendingUp } from 'lucide-react';

const page = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 flex items-center justify-between">
        <BackButton fallback='/'/>
        <h1 className="text-xl font-semibold">Profit Report</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Today</span>
          <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center">
            <Calendar size={14} className="text-gray-500" />
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Bets</p>
          <p className="text-xl font-bold mt-1">0</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Profit</p>
          <p className="text-xl font-bold mt-1">0</p>
        </div>
      </div>

      {/* Table Header */}
      <div className="px-4 mt-2">
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 text-center py-3 text-gray-400 text-sm font-medium">
            <div className="px-2">Time</div>
            <div className="px-2">Valid Bets</div>
            <div className="px-2">Bets</div>
            <div className="px-2">Profit</div>
          </div>
        </div>
      </div>

      {/* Data Row (Empty) */}
      <div className="flex-1 px-4 py-6 flex flex-col items-center justify-center">
        <div className="text-center max-w-xs">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
            <TrendingUp size={32} className="text-gray-500" />
          </div>
          <p className="text-gray-500">No profit data yet</p>
          <p className="text-xs text-gray-400 mt-1">Place bets to start tracking profits</p>
        </div>
      </div>

      {/* Optional: Bottom spacer for safe area on mobile */}
      <div className="h-4"></div>
    </div>
  );
};

export default page;