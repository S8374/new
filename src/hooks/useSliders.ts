import { useState, useEffect } from 'react';
import { sliderTypeService, SliderType } from '@/services/api/slider.types';
import { sliderService } from '@/services/api/slider.service';

export interface SliderItem {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  sliderTypeId: string;
  buttonText?: string;
  buttonLink?: string;
  imageRedirectLink: string;
  order: number;
}

export interface SliderTypeWithSliders extends SliderType {
  sliders: SliderItem[];
}

export const useSliders = () => {
  const [sliderTypes, setSliderTypes] = useState<SliderType[]>([]);
  const [slidersByType, setSlidersByType] = useState<Record<string, SliderItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all slider types
  const loadSliderTypes = async () => {
    try {
      const response = await sliderTypeService.getAllSliderTypes();
      setSliderTypes(response.data || []);
      return response.data;
    } catch (err) {
      console.error('Error loading slider types:', err);
      setError('Failed to load slider types');
      return [];
    }
  };

  // Load sliders for a specific type
  const loadSlidersByType = async (typeId: string) => {
    try {
      const response = await sliderService.getAllSliders({ sliderTypeId: typeId });
      return response.data || [];
    } catch (err) {
      console.error(`Error loading sliders for type ${typeId}:`, err);
      return [];
    }
  };

  // Load all sliders for all types
  const loadAllSliders = async () => {
    setLoading(true);
    try {
      const types = await loadSliderTypes();
      
      const slidersMap: Record<string, SliderItem[]> = {};
      
      // Load sliders for each type
      await Promise.all(
        types.map(async (type) => {
          const sliders = await loadSlidersByType(type._id);
          slidersMap[type._id] = sliders;
        })
      );
      
      setSlidersByType(slidersMap);
    } catch (err) {
      console.error('Error loading all sliders:', err);
      setError('Failed to load sliders');
    } finally {
      setLoading(false);
    }
  };

  // Load sliders for a specific type name (e.g., "hero", "hot")
  const loadSlidersByTypeName = async (typeName: string) => {
    setLoading(true);
    try {
      // First find the type by name
      const typesResponse = await sliderTypeService.getAllSliderTypes();
      const type = typesResponse.data.find((t: SliderType) => 
        t.name.toLowerCase() === typeName.toLowerCase()
      );
      
      if (!type) {
        setSlidersByType({});
        return [];
      }
      
      // Then load sliders for that type
      const sliders = await loadSlidersByType(type._id);
      setSlidersByType({ [type._id]: sliders });
      return sliders;
    } catch (err) {
      console.error(`Error loading sliders for type ${typeName}:`, err);
      setError('Failed to load sliders');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get sliders for a specific type ID
  const getSlidersForType = (typeId: string) => {
    return slidersByType[typeId] || [];
  };

  // Get sliders for a specific type name
  const getSlidersForTypeName = (typeName: string) => {
    const type = sliderTypes.find(t => t.name.toLowerCase() === typeName.toLowerCase());
    return type ? getSlidersForType(type._id) : [];
  };

  // Map slider to CardSlider item format
  const mapToCardItem = (slider: SliderItem) => ({
    id: slider._id,
    title: slider.title,
    subtitle: slider.subtitle || '',
    imageUrl: slider.image,
    redirectLink: slider.imageRedirectLink,
    buttonText: slider.buttonText,
    buttonLink: slider.buttonLink,
  });

  useEffect(() => {
    loadAllSliders();
  }, []);

  return {
    sliderTypes,
    slidersByType,
    loading,
    error,
    loadAllSliders,
    loadSlidersByTypeName,
    getSlidersForType,
    getSlidersForTypeName,
    mapToCardItem,
  };
};