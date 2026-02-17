"use client";

import { uploadImageToImageBB } from "@/lib/imageUpload";
import { SliderTypeData, sliderTypeService } from "@/services/api/slider.types";
import { useState } from "react";

interface CreateSliderTypeProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const CreateSliderType = ({ onSuccess, onClose }: CreateSliderTypeProps) => {
  const [loading, setLoading] = useState(false);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [formData, setFormData] = useState<SliderTypeData>({
    name: "",
    description: "",
    iconUrl: "",
    isActive: true,
  });

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIcon(true);
      const imageUrl = await uploadImageToImageBB(file);
      setFormData(prev => ({ ...prev, iconUrl: imageUrl }));
    } catch (error) {
      console.error("Error uploading icon:", error);
      alert("Failed to upload icon");
    } finally {
      setUploadingIcon(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);
      await sliderTypeService.createSliderType(formData);
      alert("Slider type created successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        iconUrl: "",
        isActive: true,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Error creating slider type:", error);
      alert("Failed to create slider type");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create New Slider Type</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., hero, banner, testimonial"
                required
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
                placeholder="Describe this slider type..."
              />
            </div>

            {/* Icon Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <div className="flex items-center space-x-4">
                {formData.iconUrl && (
                  <img
                    src={formData.iconUrl}
                    alt="Icon preview"
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  disabled={uploadingIcon}
                />
              </div>
              {uploadingIcon && (
                <p className="text-sm text-gray-500 mt-1">Uploading...</p>
              )}
            </div>

            {/* Icon URL Manual Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Or Icon URL
              </label>
              <input
                type="url"
                value={formData.iconUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, iconUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/icon.png"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
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
                {loading ? "Creating..." : "Create Slider Type"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};