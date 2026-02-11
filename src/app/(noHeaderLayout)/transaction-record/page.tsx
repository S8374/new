import BackButton from '@/components/ui/BackButton';
import { 
  Plus, 
  Minus, 
  Gift, 
  Box, 
  ChevronDown 
} from 'lucide-react';

const page = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800 flex items-center justify-between">
        <BackButton fallback='/'/>
        <h1 className="text-xl font-semibold">Transaction Record</h1>
        <div className="relative">
          <button className="flex items-center space-x-1 bg-gray-800 rounded-lg px-3 py-1.5 text-sm">
            <span>Yesterday</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
          {[
            { id: 'balance', label: 'Balance changes', icon: Box },
            { id: 'deposit', label: 'Deposit', icon: Plus },
            { id: 'withdraw', label: 'Withdraw', icon: Minus },
            { id: 'bonus', label: 'Bonus', icon: Gift },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                id === 'bonus'
                  ? 'text-white border-b-2 border-yellow-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={16} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table Header Row */}
      <div className="px-4 mt-3">
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 text-left py-3 px-4 text-gray-400 text-sm font-medium">
            <div>type</div>
            <div className="text-right">change/balance</div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="relative w-48 h-48 mb-6">
          {/* Box */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Box base */}
            <rect x="25" y="40" width="50" height="40" rx="6" fill="#2d2d2d" />
            {/* Box flaps */}
            <polygon points="25,40 25,30 75,30 75,40" fill="#3a3a3a" />
            <polygon points="25,80 25,90 75,90 75,80" fill="#3a3a3a" />
            <polygon points="25,40 15,50 15,70 25,80" fill="#3a3a3a" />
            <polygon points="75,40 85,50 85,70 75,80" fill="#3a3a3a" />
            
            {/* Paper plane */}
            <path d="M40,55 Q50,40 60,55 T70,55" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round" />
            <polygon points="60,55 70,50 75,55 70,60" fill="#FFD700" />
            
            {/* Coin */}
            <ellipse cx="35" cy="85" rx="8" ry="4" fill="#FFD700" />
            
            {/* Sparkles */}
            <circle cx="30" cy="45" r="1.5" fill="#FFD700" />
            <path d="M45,48 L48,45" stroke="#FFD700" strokeWidth="1.5" />
            <path d="M55,48 L52,45" stroke="#FFD700" strokeWidth="1.5" />
          </svg>
        </div>
        <p className="text-gray-500 text-center">No data</p>
      </div>

      {/* Safe area bottom */}
      <div className="h-4"></div>
    </div>
  );
};

export default page ;