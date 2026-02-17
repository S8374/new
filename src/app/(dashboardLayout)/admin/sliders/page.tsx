/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { uploadImageToImageBB } from "@/lib/imageUpload";
import { SliderData, sliderService } from "@/services/api/slider.service";
import { sliderTypeService } from "@/services/api/slider.types";
import { useState, useEffect } from "react";

interface CreateSliderProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const CreateSlider = ({ onSuccess, onClose }: CreateSliderProps) => {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sliderTypes, setSliderTypes] = useState<any[]>([]);
  const [formData, setFormData] = useState<SliderData>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    sliderTypeId: "",
    buttonText: "",
    buttonLink: "",
    imageRedirectLink: "",
    order: 0,
  });

  useEffect(() => {
    loadSliderTypes();
  }, []);

  const loadSliderTypes = async () => {
    try {
      const response = await sliderTypeService.getAllSliderTypes();
      setSliderTypes(response.data || []);
    } catch (error) {
      console.error("Error loading slider types:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadImageToImageBB(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.image || !formData.sliderTypeId) {
      alert("Title, Image, and Slider Type are required");
      return;
    }

    try {
      setLoading(true);
      await sliderService.createSlider(formData);
      alert("Slider created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        image: "",
        sliderTypeId: "",
        buttonText: "",
        buttonLink: "",
        imageRedirectLink: "",
        order: 0,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error creating slider:", error);
      alert("Failed to create slider");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create New Slider</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Slider Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slider Type *
              </label>
              <select
                value={formData.sliderTypeId}
                onChange={(e) => setFormData(prev => ({ ...prev, sliderTypeId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a slider type</option>
                {sliderTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image *
              </label>
              <div className="space-y-2">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded border"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={uploadingImage}
                />
                {uploadingImage && (
                  <p className="text-sm text-gray-500">Uploading...</p>
                )}
              </div>
            </div>

            {/* Image URL Manual Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Or Image URL *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Button Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Learn More"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Link
                </label>
                <input
                  type="url"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Image Redirect Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Redirect Link
              </label>
              <input
                type="url"
                value={formData.imageRedirectLink}
                onChange={(e) => setFormData(prev => ({ ...prev, imageRedirectLink: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/redirect"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Slider"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};