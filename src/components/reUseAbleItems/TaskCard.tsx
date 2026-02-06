"use client";

import {
  Info,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface StepTaskCardProps {
  title: string;
  subtitle: string;
  condition: string;
  reward: string; // e.g. "38U"
  currentStep: number;
  totalSteps?: number;
  status: "available" | "unavailable" | "completed";
  onStepChange?: (step: number) => void;
}

export default function StepTaskCard({
  title,
  subtitle,
  condition,
  reward,
  currentStep,
  totalSteps = 5,
  status,
  onStepChange,
}: StepTaskCardProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="bg-[#3a3941] rounded-xl p-4 text-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs text-gray-300">{subtitle}</p>
        </div>
        <Info className="w-4 h-4 text-gray-400" />
      </div>

      {/* Condition */}
      <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
        <CheckCircle2 className="w-4 h-4 text-gray-400" />
        {condition}
      </div>

      {/* Step bar */}
      <div className="flex items-center gap-2 mb-4">
        {/* Left Arrow */}
        <button
          onClick={() => onStepChange?.(currentStep - 1)}
          disabled={currentStep <= 1}
          className="w-7 h-7 rounded-full bg-[#2f2e36] flex items-center justify-center disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Steps */}
        <div className="flex-1 flex items-center justify-between relative">
          {/* Line */}
          <div className="absolute left-0 right-0 h-[3px] bg-yellow-400/40 top-1/2 -translate-y-1/2" />

          {steps.map((step) => (
            <button
              key={step}
              onClick={() => onStepChange?.(step)}
              className={`relative z-10 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition
                ${
                  step === currentStep
                    ? "bg-white text-black"
                    : "bg-yellow-400 text-black"
                }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => onStepChange?.(currentStep + 1)}
          disabled={currentStep >= totalSteps}
          className="w-7 h-7 rounded-full bg-[#2f2e36] flex items-center justify-center disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <span className="text-yellow-400 font-bold">{reward}</span>

        <span
          className={`px-3 py-1 rounded-md text-xs ${
            status === "unavailable"
              ? "bg-gray-600 text-gray-300"
              : status === "completed"
              ? "bg-green-700/40 text-green-300"
              : "bg-blue-700/40 text-blue-300"
          }`}
        >
          {status === "unavailable"
            ? "Unavailable"
            : status === "completed"
            ? "Completed"
            : "Available"}
        </span>
      </div>
    </div>
  );
}
