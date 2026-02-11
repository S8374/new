/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import StepTaskCard from "@/components/reUseAbleItems/TaskCard"
import BackButton from "@/components/ui/BackButton";
import { ArrowLeft } from "lucide-react"
import { useState } from "react";

const page = () => {
    const [step, setStep] = useState(2);

    return (
        <div>
            <div className="relative h-14 flex items-center px-4 bg-gradient-to-r from-[#0F0D2A] to-[#3A1C71]">
                {/* Back Button */}
                <BackButton fallback="/" />

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

export default page;