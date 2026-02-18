/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/slider/create-type/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sliderTypeService } from "@/services/api/slider.types";
import { uploadImageToImageBB } from "@/lib/imageUpload";
import toast from "react-hot-toast";
import { ArrowLeft, Link2, Upload } from "lucide-react";

export default function CreateSliderTypePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    iconUrl: "",
    isActive: true
  });
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const sliderTypeOptions = [
    { id: "home", label: "Home" },
    { id: "hero", label: "Hero" },
    { id: "hot", label: "Hot" },
    { id: "recent-views", label: "Recent Views" },
    { id: "slot-game", label: "Slot Game" },
    { id: "live", label: "Live" },
    { id: "fishing-game", label: "Fishing Game" },
    { id: "lottory", label: "Lottory" },
    { id: "sport", label: "Sport" },
    { id: "table-game", label: "Table Game" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIconUpload = async (file: File) => {
    try {
      setLoading(true);
      const url = await uploadImageToImageBB(file);
      setFormData(prev => ({ ...prev, iconUrl: url }));
      setIconPreview(url);
      toast.success("Icon uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload icon");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      handleIconUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }

    try {
      setLoading(true);
      await sliderTypeService.createSliderType(formData);
      toast.success("Slider type created successfully!");
      router.push("/slider");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create slider type");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/slider"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
        >
          <ArrowLeft />
          Back to Slider Management
        </Link>
        <h1 className="text-3xl font-bold text-white">Create Slider Type</h1>
        <p className="text-gray-400 mt-1">Define a new category for your sliders</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-6">
        {/* Name */}
        {/* Slider Type Selection */}
        <div>
          <label className="block text-gray-300 mb-2">
            Slider Type <span className="text-red-500">*</span>
          </label>

          <select
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          >
            <option value="">Select Slider Type</option>
            {sliderTypeOptions.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>

          <p className="text-xs text-gray-500 mt-1">
            Choose one predefined slider type
          </p>
        </div>


        {/* Description */}
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="What is this slider type used for?"
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          />
        </div>

        {/* Icon */}
        <div>
          <label className="block text-gray-300 mb-2">Icon</label>

          {/* Upload Method Toggle */}
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => setUploadMethod("file")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${uploadMethod === "file"
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
            >
              <Upload />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod("url")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${uploadMethod === "url"
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
            >
              <Link2 />
              Image URL
            </button>
          </div>

          {uploadMethod === "file" ? (
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 cursor-pointer"
              />
            </div>
          ) : (
            <input
              type="url"
              name="iconUrl"
              value={formData.iconUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/icon.png"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          )}

          {/* Preview */}
          {(iconPreview || formData.iconUrl) && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Preview:</p>
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-700">
                <img
                  src={iconPreview || formData.iconUrl}
                  alt="Icon preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${formData.isActive ? 'bg-green-500' : 'bg-gray-600'
              }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${formData.isActive ? 'transform translate-x-6' : ''
                }`}
            />
          </button>
          <span className="text-gray-300">Active</span>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white
                       bg-gradient-to-r from-yellow-500 to-orange-600
                       hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Slider Type"}
          </button>
        </div>
      </form>
    </div>
  );
}