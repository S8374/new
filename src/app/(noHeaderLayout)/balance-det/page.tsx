/* eslint-disable react-hooks/rules-of-hooks */

"use client"
import BackButton from "@/components/ui/BackButton";
import { useState } from "react";

const page = () => {
    const [type, setType] = useState<"Deposit" | "Withdraw">("Deposit");

    return (
        <div>
             <div className="relative h-16 flex items-center px-4  border-gray-800">
                      <BackButton className="mr-3" fallback="/" />
            
                    <h1 className="text-xl font-bold text-white flex-1 text-center">Balance Record</h1>
                    <p></p>
                  </div>
            
        {/* Type */}
        <div>
          <div className="flex gap-2">
            <button
              onClick={() => setType("Deposit")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                type === "Deposit"
                  ? "bg-white text-black"
                  : "bg-[#252334] text-gray-300 hover:bg-[#2D2C3A]"
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => setType("Withdraw")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                type === "Withdraw"
                  ? "bg-white text-black"
                  : "bg-[#252334] text-gray-300 hover:bg-[#2D2C3A]"
              }`}
            >
              Withdraw
            </button>
          </div>
        </div>
        </div>
    )
}

export default page