// components/promotions/PromotionDetailPage.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PromotionDetailPage() {
    // Simulate loading or fetch from API later
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Simulate data load
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#1A1826] to-[#2D2C3A] flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1A1826] to-[#2D2C3A] pb-20">
            <div className="relative h-14 flex items-center px-4 bg-gradient-to-r from-[#0F0D2A] to-[#3A1C71]">
                {/* Back Button */}
                <button
                    
                    className="absolute left-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                    aria-label="Back"
                >
                    <ArrowLeft/>
                </button>

                {/* Title - centered */}
                <h1 className="text-xl font-bold text-white mx-auto">ytaeryre</h1>

                {/* Right spacer (empty) */}
                <div className="w-8"></div>
            </div>
            <div className="p-6 ">
                {/* Header */}
                <div className="relative h-48 rounded-xl overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(https://admin.tkv6test.cc/uploads/20251126/0ab6232392ffde09f96e20d02035afea.png)`,
                        }}
                    />

                    {/* <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">活动详情</h1>
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div> */}
                </div>

                {/* Content */}
                <div className="max-w-2xl mx-auto px-4 pt-6">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-2">电子闯关</h2>
                    <p className="text-yellow-400 text-sm mb-6">完成任务 领取奖励</p>

                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                            <span className="text-white font-bold text-xs">SKY.TOP</span>
                        </div>
                        <span className="text-gray-400 text-xs">娱乐在线 畅享无限</span>
                    </div>

                    {/* Section: 活动时间 */}
                    <div className="bg-[#252334] rounded-xl p-4 mb-6">
                        <h3 className="font-bold text-white mb-2">活动时间</h3>
                        <p className="text-gray-300">长期有效</p>
                    </div>

                    {/* Section: 简介 */}
                    <div className="bg-[#252334] rounded-xl p-4 mb-6">
                        <h3 className="font-bold text-white mb-2">简介：</h3>
                        <p className="text-gray-300 leading-relaxed">
                            若电子投注流水达到指定金额即可领取对应奖励<br />
                            每日最高可领取 85U
                        </p>
                    </div>

                    {/* Section: 奖励明细 */}
                    <div className="bg-[#252334] rounded-xl p-4 mb-6">
                        <h3 className="font-bold text-white mb-3">嘉奖明细：</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="pb-2 text-gray-400 text-sm font-medium">档位</th>
                                        <th className="pb-2 text-gray-400 text-sm font-medium">有效投注</th>
                                        <th className="pb-2 text-gray-400 text-sm font-medium">奖励金额(U)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { tier: "1", bet: "1000+", reward: "5" },
                                        { tier: "2", bet: "3000+", reward: "15" },
                                        { tier: "3", bet: "5000+", reward: "25" },
                                        { tier: "4", bet: "10000+", reward: "35" },
                                        { tier: "5", bet: "50000+", reward: "85" },
                                    ].map((row, idx) => (
                                        <tr
                                            key={idx}
                                            className={`border-b ${idx % 2 === 0 ? "bg-black/20" : ""} last:border-b-0`}
                                        >
                                            <td className="py-3 text-white">{row.tier}</td>
                                            <td className="py-3 text-yellow-400 font-medium">{row.bet}</td>
                                            <td className="py-3 text-yellow-400 font-bold">{row.reward}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section: 活动规则 */}
                    <div className="bg-[#252334] rounded-xl p-4 mb-8">
                        <h3 className="font-bold text-white mb-3">活动规则：</h3>
                        <ol className="space-y-3 text-gray-300 list-decimal pl-5">
                            <li>奖励金额需一倍流水方可提现；</li>
                            <li>
                                仅限于电子闯关游戏投注，每日每个关卡可领取一次，领取后将扣除相应档位的流水，比如第一档位有效投注1000，领取5U奖励后，总流水将扣除1000；
                            </li>
                            <li>
                                此活动只适用于拥有一个账号的会员；每个设备、每个telegram、每个支付方式、每个IP地址只享受一次，恶意刷单，平台有权不给与奖励；
                            </li>
                            <li>
                                为避免文字上的理解差异，平台保持对本活动的最终解释权，并且有权更换推迟或取消活动。
                            </li>
                        </ol>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                            立即游戏
                        </button>
                        <Link href={`/task/1`}>
                          <button className="flex-1 py-4 bg-[#1E1D2A] text-white font-bold rounded-xl border border-gray-700 hover:bg-[#252334] transition-colors">
                            前往任务中心
                        </button>
                        </Link>
                      
                    </div>
                </div>
            </div>
        </div>
    );
}