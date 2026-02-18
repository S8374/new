// app/(dashboard)/slider/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sliderTypeService } from "@/services/api/slider.types";
import { sliderService } from "@/services/api/slider.service";
import toast from "react-hot-toast";
import { Edit, Eye, FileChartLine, FileCheck2, FileEdit, FileImage, FileKey2Icon, FilePlus, FileType, FileType2Icon, FileTypeIcon, Plus, Trash, Type } from "lucide-react";


export default function SliderManagementPage() {
    const [typesWithSliders, setTypesWithSliders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());
    console.log("typesWithSliders", expandedTypes);
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await sliderTypeService.getSliderTypeWithSliders();
            console.log("Types with sliders data:", res.data); // Debug log

            setTypesWithSliders(res.data || []);
        } catch (error) {
            toast.error("Failed to fetch slider data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleType = (typeId: string) => {
        const newExpanded = new Set(expandedTypes);
        if (newExpanded.has(typeId)) {
            newExpanded.delete(typeId);
        } else {
            newExpanded.add(typeId);
        }
        setExpandedTypes(newExpanded);
    };

    const handleDeleteSlider = async (sliderId: string) => {
        if (!confirm("Are you sure you want to delete this slider?")) return;

        try {
            await sliderService.deleteSlider(sliderId);
            toast.success("Slider deleted successfully");
            fetchData(); // Refresh data
        } catch (error) {
            toast.error("Failed to delete slider");
        }
    };

    const handleDeleteType = async (typeId: string) => {
        if (!confirm("Are you sure you want to delete this slider type? All associated sliders will also be deleted.")) return;

        try {
            await sliderTypeService.deleteSliderType(typeId);
            toast.success("Slider type deleted successfully");
            fetchData(); // Refresh data
        } catch (error) {
            toast.error("Failed to delete slider type");
        }
    };

    const toggleSliderStatus = async (sliderId: string, currentStatus: boolean) => {
        try {
            await sliderService.updateSlider(sliderId, { isActive: !currentStatus });
            toast.success(`Slider ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
            fetchData(); // Refresh data
        } catch (error) {
            toast.error("Failed to update slider status");
        }
    };

    const toggleTypeStatus = async (typeId: string, currentStatus: boolean) => {
        try {
            await sliderTypeService.updateSliderType(typeId, { isActive: !currentStatus });
            toast.success(`Slider type ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
            fetchData(); // Refresh data
        } catch (error) {
            toast.error("Failed to update slider type status");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Slider Management</h1>
                    <p className="text-gray-400 mt-1">Manage your slider types and their sliders</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/add-slider-type"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                    >
                        <FilePlus />
                        New Type
                    </Link>
                    <Link
                        href="/admin/sliders"
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition flex items-center gap-2"
                    >
                        <FilePlus />
                        New Slider
                    </Link>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/20 rounded-lg">
                            <FileType className="text-yellow-500 text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Types</p>
                            <p className="text-2xl font-bold text-white">{typesWithSliders.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center gap-4">


                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <FileImage className="text-green-500 text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Sliders</p>
                            <p className="text-2xl font-bold text-white">
                                {typesWithSliders.reduce((acc, type) => acc + (type.sliders?.length || 0), 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <FileTypeIcon className="text-blue-500 text-2xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Active Sliders</p>
                            <p className="text-2xl font-bold text-white">
                                {typesWithSliders.reduce((acc, type) =>
                                    acc + (type.sliders?.filter((s: any) => s.isActive).length || 0), 0
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider Types with Sliders */}
            <div className="space-y-4">
                {typesWithSliders.map((type) => (
                    <div key={type._id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                        {/* Type Header */}
                        <div className="p-4 flex items-center justify-between bg-gray-800/50">
                            <div className="flex items-center gap-4 flex-1">
                                <button
                                    onClick={() => toggleType(type._id)}
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    {expandedTypes.has(type._id) ? <FileChartLine size={20} /> : <FileCheck2 size={20} />}
                                </button>

                                {type.iconUrl && (
                                    <img src={type.iconUrl} alt={type.name} className="w-8 h-8 rounded object-cover" />
                                )}

                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold text-white">{type.name}</h3>
                                        <span className={`px-2 py-1 text-xs rounded-full ${type.isActive
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {type.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    {type.description && (
                                        <p className="text-sm text-gray-400 mt-1">{type.description}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400">
                                        {type.sliders?.length || 0} sliders
                                    </span>

                                    <button
                                        onClick={() => toggleTypeStatus(type._id, type.isActive)}
                                        className="p-2 text-gray-400 hover:text-white transition"
                                        title={type.isActive ? 'Deactivate' : 'Activate'}
                                    >
                                        {type.isActive ? <FileType2Icon size={18} /> : <FileKey2Icon size={18} />}
                                    </button>

                                    <Link
                                        href={`/admin/add-slider-type/${type._id}`}
                                        className="p-2 text-gray-400 hover:text-yellow-500 transition"
                                    >
                                        <FileEdit size={18} />
                                    </Link>

                                    <button
                                        onClick={() => handleDeleteType(type._id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sliders List */}
                        {expandedTypes.has(type._id) && (
                            <div className="p-4 space-y-3">
                                {type.sliders?.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">No sliders in this type</p>
                                ) : (
                                    type.sliders?.map((slider: any, index: number) => (
                                        <div
                                            key={slider._id}
                                            className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition"
                                        >
                                            {/* Order Badge */}
                                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium text-white">
                                                {slider.order || index + 1}
                                            </div>

                                            {/* Image */}
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700">
                                                <img
                                                    src={slider.image}
                                                    alt={slider.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-medium text-white">{slider.title}</h4>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full ${slider.isActive
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {slider.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                {slider.subtitle && (
                                                    <p className="text-sm text-gray-400">{slider.subtitle}</p>
                                                )}
                                                {slider.buttonText && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Button: {slider.buttonText} → {slider.buttonLink}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleSliderStatus(slider._id, slider.isActive)}
                                                    className="p-2 text-gray-400 hover:text-white transition"
                                                    title={slider.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    {slider.isActive ? <Eye size={16} /> : <Eye size={16} />}
                                                </button>

                                                <Link
                                                    href={`/admin/sliders/${slider._id}`}
                                                    className="p-2 text-gray-400 hover:text-yellow-500 transition"
                                                >
                                                    <Edit size={16} />
                                                </Link>

                                                <button
                                                    onClick={() => handleDeleteSlider(slider._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {typesWithSliders.length === 0 && (
                    <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
                        <Type className="mx-auto text-4xl text-gray-600 mb-3" />
                        <h3 className="text-xl font-medium text-white mb-2">No Slider Types Found</h3>
                        <p className="text-gray-400 mb-4">Get started by creating your first slider type</p>
                        <Link
                            href="/slider/create-type"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition"
                        >
                            <Plus />
                            Create Slider Type
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}