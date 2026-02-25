"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  Copy,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import { depositService } from "@/services/api/deposit.service";

type Tab = "manual" | "auto" | "crypto";

interface PaymentMethod {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  tab: Tab;
  description?: string;
  order: number;
  isActive: boolean;
}

interface Instruction {
  _id: string;
  step: number;
  text: string;
  tab: Tab;
  isActive: boolean;
}

interface FormField {
  _id: string;
  label: string;
  name: string;
  tab: Tab;
  type: 'text' | 'number' | 'textarea'|'screenshot';
  placeholder?: string;
  required: boolean;
  order: number;
  isActive: boolean;
}

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState<Tab>("crypto");
  const [copied, setCopied] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  
  // Form state
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // Data from API
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  
  const walletAddress = "TEfuvvysBmXuUmBUxZGFM1J9a6LSVHGCP";
  console.log(formData)
  // Fetch data based on active tab
  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  const fetchTabData = async () => {
    try {
      setLoading(true);
      
      // Fetch payment methods for this tab
      const methodsRes = await depositService.getPaymentMethodByTab(activeTab);
      if (methodsRes?.success) {
        setPaymentMethods(methodsRes.data || []);
      }

      // Fetch instructions for this tab
      const instructionsRes = await depositService.getInstructionsByTab(activeTab);
      if (instructionsRes?.success) {
        setInstructions(instructionsRes.data || []);
      }

      // Fetch form fields for this tab
      const fieldsRes = await depositService.getFormFieldsByTab(activeTab);
      if (fieldsRes?.success) {
        setFormFields(fieldsRes.data || []);
        // Initialize form data with empty strings
        const initialData: Record<string, string> = {};
        fieldsRes.data.forEach((field: FormField) => {
          initialData[field.name] = '';
        });
        setFormData(initialData);
      }

    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      // Simulate upload - replace with actual upload logic
      setTimeout(() => {
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { tab: activeTab, ...formData });
    // Add your submission logic here
    alert("Deposit request submitted!");
  };

  // Get icon for payment method
  const getMethodIcon = (method: PaymentMethod) => {
    if (method.icon) {
      return <img src={method.icon} alt={method.name} className="w-8 h-8 rounded-full" />;
    }
    // Fallback to first 2 letters
    return <span className="text-xs font-bold text-black">{method.name.slice(0, 2).toUpperCase()}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1D2A] text-white pb-10">
        <div className="relative h-16 flex items-center justify-between px-4 border-b border-gray-800">
          <BackButton />
          <h1 className="text-xl font-bold flex-1 text-center">Deposit</h1>
          <button className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1D2A] text-white pb-10">
      {/* Header */}
      <div className="relative h-16 flex items-center justify-between px-4 border-b border-gray-800">
        <BackButton />
        <h1 className="text-xl font-bold flex-1 text-center">Deposit</h1>
        <button className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50">
          <AlertCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-5 pb-3">
        <div className="grid grid-cols-3 gap-2 bg-[#252334] rounded-xl p-1.5 border border-gray-800/60">
          <button
            onClick={() => setActiveTab("manual")}
            className={`py-3 text-sm font-semibold rounded-lg transition-all ${activeTab === "manual"
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md"
              : "text-gray-400 hover:text-white hover:bg-black/30"
            }`}
          >
            BDT - Manual
          </button>
          <button
            onClick={() => setActiveTab("auto")}
            className={`py-3 text-sm font-semibold rounded-lg transition-all ${activeTab === "auto"
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md"
              : "text-gray-400 hover:text-white hover:bg-black/30"
            }`}
          >
            Auto Deposit
          </button>
          <button
            onClick={() => setActiveTab("crypto")}
            className={`py-3 text-sm font-semibold rounded-lg transition-all ${activeTab === "crypto"
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md"
              : "text-gray-400 hover:text-white hover:bg-black/30"
            }`}
          >
            Crypto Deposit
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-md mx-auto px-4">
        {activeTab === "manual" && (
          <form onSubmit={handleSubmit} className="bg-[#252334] rounded-2xl p-6 border border-gray-800/50">
            {/* Payment Methods */}
            {paymentMethods.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method._id}
                    className="w-28 h-20 bg-gray-800 rounded-xl flex flex-col items-center justify-center p-2 hover:bg-gray-700 transition cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-white rounded-full mb-1 flex items-center justify-center">
                      {getMethodIcon(method)}
                    </div>
                    <span className="text-xs text-center">{method.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Instructions */}
            {instructions.length > 0 && (
              <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700/50 mb-6">
                <ul className="space-y-3 text-sm text-gray-200">
                  {instructions
                    .sort((a, b) => a.step - b.step)
                    .map((instruction) => (
                      <li key={instruction._id} className="flex items-start gap-2">
                        <span className="text-green-400 font-bold mt-0.5">{instruction.step}.</span>
                        <span dangerouslySetInnerHTML={{ __html: instruction.text }} />
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {formFields
                .sort((a, b) => a.order - b.order)
                .map((field) => (
                  <div key={field._id}>
                    <label className="block text-sm text-gray-300 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label}`}
                        rows={3}
                        required={field.required}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label}`}
                        required={field.required}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white text-center text-xl placeholder-gray-500 focus:outline-none focus:border-green-500"
                      />
                    )}
                  </div>
                ))}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:brightness-110 transition"
              >
                Deposit Now
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-5">
              Minimum: 100 BDT • Maximum deposit amount 10,000 BDT
            </p>
          </form>
        )}

        {activeTab === "auto" && (
          <form onSubmit={handleSubmit} className="bg-[#252334] rounded-2xl p-6 border border-gray-800/50 text-center">
            <div className="mb-6">
              <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 mb-5 text-sm">
                <p className="text-green-300 font-medium">
                  গাড়ি পেমেন্ট করতে হলে ২.০% চার্জ লাগবে এবং বিকাশ/নগদ/রকেট থেকে পেমেন্ট করুন
                </p>
              </div>
              
              {/* Payment Methods for Auto */}
              {paymentMethods.length > 0 && (
                <div className="flex justify-center gap-4 mb-4">
                  {paymentMethods.map((method) => (
                    <div key={method._id} className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        {method.icon ? (
                          <img src={method.icon} alt={method.name} className="w-10 h-10" />
                        ) : (
                          <span className="text-xl font-bold text-black">{method.name.slice(0, 2)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <h3 className="text-lg font-bold mb-2">Auto Deposit</h3>
              <p className="text-gray-400 text-sm">
                Instant deposit — no need to upload screenshot
              </p>
            </div>

            {/* Instructions */}
            {instructions.length > 0 && (
              <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/50 mb-4 text-left">
                <ul className="space-y-2 text-sm text-gray-200">
                  {instructions
                    .sort((a, b) => a.step - b.step)
                    .map((instruction) => (
                      <li key={instruction._id} className="flex items-start gap-2">
                        <span className="text-green-400 font-bold mt-0.5">{instruction.step}.</span>
                        <span>{instruction.text}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {formFields
                .sort((a, b) => a.order - b.order)
                .map((field) => (
                  <input
                    key={field._id}
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder || `Enter ${field.label}`}
                    required={field.required}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 text-white text-center text-xl placeholder-gray-500 focus:outline-none focus:border-green-500"
                  />
                ))}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-lg rounded-xl hover:brightness-110 transition"
              >
                Proceed to Auto Deposit
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Service charge may apply • Instant confirmation
            </p>
          </form>
        )}

        {activeTab === "crypto" && (
          <form onSubmit={handleSubmit} className="bg-[#252334] rounded-2xl p-6 border border-gray-800/50">
            {/* Network Selection */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {paymentMethods.map((method) => (
                <div key={method._id} className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full">
                  {method.icon ? (
                    <img src={method.icon} alt={method.name} className="w-7 h-7 rounded-full" />
                  ) : (
                    <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="font-bold">{method.name}</span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            {instructions.length > 0 && (
              <ul className="space-y-3 text-sm text-gray-200 mb-5">
                {instructions
                  .sort((a, b) => a.step - b.step)
                  .map((instruction) => (
                    <li key={instruction._id} className="flex items-start gap-2">
                      <span className="text-green-400 font-bold mt-0.5">{instruction.step}.</span>
                      <span>{instruction.text}</span>
                    </li>
                  ))}
              </ul>
            )}

            {/* Wallet Address */}
            <div className="text-center mb-5">
              <div className="text-gray-400 text-sm mb-2">Wallet / TRC20 Address</div>
              <div className="font-mono bg-black/40 rounded-lg p-3 break-all text-sm">
                {walletAddress}
              </div>
              <button
                type="button"
                onClick={copyAddress}
                className="mt-2 text-xs text-yellow-400 hover:underline flex items-center gap-1 mx-auto"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mt-6">
              {formFields
                .sort((a, b) => a.order - b.order)
                .map((field) => {
                  if (field.type === 'textarea') {
                    return (
                      <div key={field._id}>
                        <label className="block text-sm text-gray-300 mb-1.5">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <textarea
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={field.placeholder || `Enter ${field.label}`}
                          rows={3}
                          required={field.required}
                          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    );
                  }
                  
                  if (field.type === 'screenshot' || field.label.toLowerCase().includes('screenshot')) {
                    return (
                      <div key={field._id}>
                        <label className="block text-sm text-gray-300 mb-1.5">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="screenshot-upload"
                          />
                          <label
                            htmlFor="screenshot-upload"
                            className={`border-2 border-dashed rounded-xl p-5 text-center transition cursor-pointer block
                              ${uploadStatus === 'success' ? 'border-green-500 bg-green-500/10' : 
                                uploadStatus === 'error' ? 'border-red-500 bg-red-500/10' : 
                                'border-gray-600 hover:border-yellow-500/50'}`}
                          >
                            {uploadStatus === 'uploading' && (
                              <>
                                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-400 animate-spin" />
                                <p className="text-sm text-yellow-400">Uploading...</p>
                              </>
                            )}
                            {uploadStatus === 'success' && (
                              <>
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                                <p className="text-sm text-green-500">Upload successful!</p>
                              </>
                            )}
                            {uploadStatus === 'error' && (
                              <>
                                <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                                <p className="text-sm text-red-500">Upload failed. Try again.</p>
                              </>
                            )}
                            {uploadStatus === 'idle' && (
                              <>
                                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-400">Tap to upload {field.label}</p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={field._id}>
                      <label className="block text-sm text-gray-300 mb-1.5">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label}`}
                        required={field.required}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  );
                })}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:brightness-110 transition"
              >
                Deposit Now
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-5">
              Minimum: 1 USDT • Maximum deposit amount 100 USDT
            </p>
          </form>
        )}
      </div>
    </div>
  );
}