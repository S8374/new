"use client";

import { useEffect, useState } from "react";
import { marqueeService, Marquee } from "@/services/api/marquee.service";
import { Pencil, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Plus, X } from "lucide-react";

const MarqueeAdmin = () => {
  const [marquees, setMarquees] = useState<Marquee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMarquee, setEditingMarquee] = useState<Marquee | null>(null);
  const [formData, setFormData] = useState({
    text: "",
    isActive: true,
    order: 0,
    startDate: "",
    endDate: "",
  });

  // Fetch all marquees
  const fetchMarquees = async () => {
    try {
      setLoading(true);
      const res = await marqueeService.getAllMarquees();
      if (res?.success) {
        setMarquees(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch marquees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarquees();
  }, []);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Open create modal
  const openCreateModal = () => {
    setEditingMarquee(null);
    setFormData({
      text: "",
      isActive: true,
      order: marquees.length + 1,
      startDate: "",
      endDate: "",
    });
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (marquee: Marquee) => {
    setEditingMarquee(marquee);
    setFormData({
      text: marquee.text,
      isActive: marquee.isActive,
      order: marquee.order,
      startDate: marquee.startDate ? new Date(marquee.startDate).toISOString().split('T')[0] : "",
      endDate: marquee.endDate ? new Date(marquee.endDate).toISOString().split('T')[0] : "",
    });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingMarquee(null);
  };

  // Create marquee
  const handleCreate = async () => {
    if (!formData.text.trim()) {
      alert("Please enter marquee text");
      return;
    }

    try {
      const dataToSend: any = {
        text: formData.text,
        isActive: formData.isActive,
        order: formData.order,
      };

      if (formData.startDate) {
        dataToSend.startDate = new Date(formData.startDate);
      }
      if (formData.endDate) {
        dataToSend.endDate = new Date(formData.endDate);
      }

      await marqueeService.createMarquee(dataToSend);
      closeModal();
      fetchMarquees();
    } catch (error) {
      console.error("Failed to create marquee", error);
      alert("Failed to create marquee");
    }
  };

  // Update marquee
  const handleUpdate = async () => {
    if (!editingMarquee) return;
    if (!formData.text.trim()) {
      alert("Please enter marquee text");
      return;
    }

    try {
      const dataToSend: any = {
        text: formData.text,
        isActive: formData.isActive,
        order: formData.order,
      };

      if (formData.startDate) {
        dataToSend.startDate = new Date(formData.startDate);
      } else {
        dataToSend.startDate = null;
      }
      
      if (formData.endDate) {
        dataToSend.endDate = new Date(formData.endDate);
      } else {
        dataToSend.endDate = null;
      }

      await marqueeService.updateMarquee(editingMarquee._id, dataToSend);
      closeModal();
      fetchMarquees();
    } catch (error) {
      console.error("Failed to update marquee", error);
      alert("Failed to update marquee");
    }
  };

  // Delete marquee
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this marquee?")) return;

    try {
      await marqueeService.deleteMarquee(id);
      fetchMarquees();
    } catch (error) {
      console.error("Failed to delete marquee", error);
      alert("Failed to delete marquee");
    }
  };

  // Toggle active status
  const toggleActive = async (id: string, current: boolean) => {
    try {
      await marqueeService.updateMarquee(id, {
        isActive: !current,
      });
      fetchMarquees();
    } catch (error) {
      console.error("Failed to toggle marquee status", error);
    }
  };

  // Move order up/down
  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = marquees.findIndex(m => m._id === id);
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === marquees.length - 1) return;

    const newMarquees = [...marquees];
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap orders
    const tempOrder = newMarquees[currentIndex].order;
    newMarquees[currentIndex].order = newMarquees[swapIndex].order;
    newMarquees[swapIndex].order = tempOrder;

    try {
      // Update both marquees
      await marqueeService.updateMarquee(newMarquees[currentIndex]._id, {
        order: newMarquees[currentIndex].order
      });
      await marqueeService.updateMarquee(newMarquees[swapIndex]._id, {
        order: newMarquees[swapIndex].order
      });
      
      setMarquees(newMarquees.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Failed to reorder marquees", error);
      fetchMarquees(); // Refresh to correct state
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading marquees...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Marquee Management</h1>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add New Marquee
          </button>
        </div>

        {/* Marquee List */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-700 text-white font-semibold">
            <div className="col-span-1">Order</div>
            <div className="col-span-5">Text</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date Range</div>
            <div className="col-span-2">Actions</div>
          </div>

          {marquees.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No marquees found. Click "Add New Marquee" to create one.
            </div>
          ) : (
            marquees.sort((a, b) => a.order - b.order).map((marquee) => (
              <div
                key={marquee._id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors"
              >
                <div className="col-span-1 text-white flex items-center gap-1">
                  <span>{marquee.order}</span>
                  <div className="flex flex-col ml-2">
                    <button
                      onClick={() => moveOrder(marquee._id, 'up')}
                      className="text-gray-400 hover:text-white"
                      disabled={marquee.order === 1}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => moveOrder(marquee._id, 'down')}
                      className="text-gray-400 hover:text-white"
                      disabled={marquee.order === marquees.length}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-5 text-white truncate">
                  {marquee.text}
                </div>
                
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    marquee.isActive 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {marquee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="col-span-2 text-white text-sm">
                  {marquee.startDate ? new Date(marquee.startDate).toLocaleDateString() : 'No start'}
                  {marquee.endDate ? ` → ${new Date(marquee.endDate).toLocaleDateString()}` : ''}
                </div>
                
                <div className="col-span-2 flex gap-2">
                  <button
                    onClick={() => toggleActive(marquee._id, marquee.isActive)}
                    className={`p-1 rounded ${
                      marquee.isActive 
                        ? 'bg-yellow-600 hover:bg-yellow-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    title={marquee.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {marquee.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  
                  <button
                    onClick={() => openEditModal(marquee)}
                    className="p-1 bg-blue-600 hover:bg-blue-700 rounded"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(marquee._id)}
                    className="p-1 bg-red-600 hover:bg-red-700 rounded"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                {editingMarquee ? 'Edit Marquee' : 'Create New Marquee'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Text */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Text *
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                  placeholder="Enter marquee text"
                  required
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-300">
                  Active
                </label>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingMarquee ? handleUpdate : handleCreate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  {editingMarquee ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarqueeAdmin;