import Link from "next/link";

const NavItems = () => {
  const items = [
    {
      iconImg: "https://tkzc668.com/static/img/%E9%87%91%E5%88%9A%E5%8C%BA_%E5%85%85%E5%80%BC.79e3487a.webp",
      label: "Deposit",
      href: "/deposit",
      color: "from-blue-500 to-cyan-500",
    },
    {
      iconImg: "https://tkzc668.com/static/img/recharge.77f88fba.png",
      label: "Withdraw",
      href: "/withdraw",
      color: "from-green-500 to-emerald-500",
    },
    {
      iconImg: "https://tkzc668.com/static/img/renwu.08955b7b.png",
      label: "Task",
      href: "/tasks",
      color: "from-purple-500 to-pink-500",
    },
    {
      iconImg: "https://tkzc668.com/static/img/shouru.c9225545.png",
      label: "Income",
      href: "/my-income",
      color: "from-rose-500 to-pink-500",
    },
    {
      iconImg: "https://tkzc668.com/static/img/inviteFriends.78ba91c4.png",
      label: "Invite",
      href: "/invite",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-2">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex flex-col items-center group cursor-pointer"
        >
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl 
            flex items-center justify-center 
            group-hover:scale-105 transition-transform duration-300`}
          >
            
              <img
                src={item.iconImg}
                alt={item.label}
                className="object-contain"
              />
         
          </div>

          {/* Label */}
          <span className="mt-2 text-sm font-medium text-background dark:text-gray-300">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
