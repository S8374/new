import { Wallet, CreditCard, Star, TrendingUp, Users } from "lucide-react";

const NavItems = () => {
  const items = [
    { icon: Wallet, label: "Deposit", color: "from-blue-500 to-cyan-500" },
    { icon: CreditCard, label: "Withdraw", color: "from-green-500 to-emerald-500" },
    { icon: Star, label: "Task", color: "from-purple-500 to-pink-500" },
    { icon: TrendingUp, label: "Income", color: "from-rose-500 to-pink-500" },
    { icon: Users, label: "Invite", color: "from-indigo-500 to-violet-500" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 py-4 px-2">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center group">
          {/* Icon with gradient background */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
            <item.icon 
              size={20} 
              strokeWidth={1.5} 
              className="text-white" 
            />
          </div>
          {/* Label */}
          <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NavItems;