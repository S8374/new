// app/(dashboard)/slider/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { sliderService } from "@/services/api/slider.service";
import { sliderTypeService } from "@/services/api/slider.types";
import { uploadImageToImageBB } from "@/lib/imageUpload";
import { ArrowLeft, Link2, Upload } from "lucide-react";

export default function EditSliderPage() {
  const router = useRouter();
  const params = useParams();
  const sliderId = params.id as string;

  const [sliderTypes, setSliderTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    sliderTypeId: "",
    buttonText: "",
    buttonLink: "",
    imageRedirectLink: "",
    order: 0,
    isActive: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch types and slider in parallel
        const [typesRes, sliderRes] = await Promise.all([
          sliderTypeService.getAllSliderTypes(),
          sliderService.getSliderById(sliderId)
        ]);

        setSliderTypes(typesRes.data || []);
        
        const slider = sliderRes.data;
        setFormData({
          title: slider.title || "",
          subtitle: slider.subtitle || "",
          description: slider.description || "",
          image: slider.image || "",
          sliderTypeId: slider.sliderTypeId || "",
          buttonText: slider.buttonText || "",
          buttonLink: slider.buttonLink || "",
          imageRedirectLink: slider.imageRedirectLink || "",
          order: slider.order || 0,
          isActive: slider.isActive ?? true
        });
        
        if (slider.image) {
          setImagePreview(slider.image);
        }
      } catch (error) {
        toast.error("Failed to fetch slider data");
        router.push("/slider");
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [sliderId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value
    }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setLoading(true);
      const url = await uploadImageToImageBB(file);
      setFormData(prev => ({ ...prev, image: url }));
      setImagePreview(url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Title is required");
    }
    if (!formData.image) {
      return toast.error("Please upload or enter an image URL");
    }
    if (!formData.sliderTypeId) {
      return toast.error("Please select a slider type");
    }
    if (!formData.imageRedirectLink.trim()) {
      return toast.error("Image redirect link is required");
    }

    try {
      setLoading(true);
      await sliderService.updateSlider(sliderId, formData);
      toast.success("Slider updated successfully!");
      router.push("/slider");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update slider");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/slider"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
        >
          <ArrowLeft />
          Back to Slider Management
        </Link>
        <h1 className="text-3xl font-bold text-white">Edit Slider</h1>
        <p className="text-gray-400 mt-1">Update your slider information</p>
      </div>

      {/* Form - similar to create form but with edit button */}
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-6">
        {/* ... All the same fields as create form ... */}
        <div>
          <label className="block text-gray-300 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-300 mb-2">
            Image <span className="text-red-500">*</span>
          </label>
          
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => setUploadMethod("file")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                uploadMethod === "file"
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                uploadMethod === "url"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <Link2 />
              Image URL
            </button>
          </div>

          {uploadMethod === "file" ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 cursor-pointer"
            />
          ) : (
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          )}

          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Preview:</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-700">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Slider Type Selection */}
        <div>
          <label className="block text-gray-300 mb-2">
            Slider Type <span className="text-red-500">*</span>
          </label>
          <select
            name="sliderTypeId"
            value={formData.sliderTypeId}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          >
            <option value="">Select a slider type</option>
            {sliderTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name} {!type.isActive && "(Inactive)"}
              </option>
            ))}
          </select>
        </div>

        {/* Button Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Button Link</label>
            <input
              type="text"
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Image Redirect Link */}
        <div>
          <label className="block text-gray-300 mb-2">
            Image Redirect Link <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="imageRedirectLink"
            value={formData.imageRedirectLink}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Order and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Display Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Status</label>
            <div className="flex items-center gap-3 h-full pt-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.isActive ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    formData.isActive ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
              <span className="text-gray-300">{formData.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
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
            {loading ? "Updating..." : "Update Slider"}
          </button>
        </div>
      </form>
    </div>
  );
}