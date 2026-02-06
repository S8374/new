/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import StepTaskCard from "@/components/reUseAbleItems/TaskCard"
import { ArrowLeft } from "lucide-react"
import { useState } from "react";

const page = () => {
    const [step, setStep] = useState(2);

    return (
        <div>
            <div className="relative h-14 flex items-center px-4 bg-gradient-to-r from-[#0F0D2A] to-[#3A1C71]">
                {/* Back Button */}
                <button

                    className="absolute left-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                    aria-label="Back"
                >
                    <ArrowLeft />
                </button>

                {/* Title - centered */}
                <h1 className="text-xl font-bold text-white mx-auto">ytaeryre</h1>

                {/* Right spacer (empty) */}
                <div className="w-8"></div>
            </div>
            <div className="max-w-md mx-auto p-4 space-y-6">
                <StepTaskCard
                    title="每日翻倍金"
                    subtitle="电子亏损奖励加翻倍，最多3888U"
                    condition="Slot Loss Rebate ≥ 500"
                    reward="38U"
                    currentStep={3}
                    status="unavailable"
                    onStepChange={setStep}
                />
                <StepTaskCard
                    title="每日翻倍金"
                    subtitle="电子亏损奖励加翻倍，最多3888U"
                    condition="Slot Loss Rebate ≥ 500"
                    reward="38U"
                    currentStep={3}
                    status="unavailable"
                    onStepChange={setStep}
                />
                <StepTaskCard
                    title="每日翻倍金"
                    subtitle="电子亏损奖励加翻倍，最多3888U"
                    condition="Slot Loss Rebate ≥ 500"
                    reward="38U"
                    currentStep={3}
                    status="unavailable"
                    onStepChange={setStep}
                />
            </div>
        </div>
    )
}

export default page