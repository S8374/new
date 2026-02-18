// services/api/banner.service.ts
import api from "../api";

export interface BannerSlider {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  imageRedirectLink: string;
  order: number;
  isActive: boolean;
}

export interface SliderTypeWithSliders {
  _id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  isActive: boolean;
  sliders: BannerSlider[];
}

export const bannerService = {
  // Get hero sliders specifically
  async getHeroSliders(): Promise<BannerSlider[]> {
    try {
      const response = await api.get("/slider-type/get-all-type-with-slider");
      const data = response?.data?.data || [];
      
      // Find the "hero" slider type (case insensitive)
      const heroType = data.find(
        (type: SliderTypeWithSliders) => 
          type.name.toLowerCase() === "hero" && type.isActive
      );
      
      // Return active sliders sorted by order
      return heroType?.sliders
        ?.filter((slider: BannerSlider) => slider.isActive)
        ?.sort((a: BannerSlider, b: BannerSlider) => a.order - b.order) || [];
    } catch (error) {
      console.error("Error fetching hero sliders:", error);
      return [];
    }
  },

  // Get sliders by type name
  async getSlidersByType(typeName: string): Promise<BannerSlider[]> {
    try {
      const response = await api.get("/slider-type/get-all-type-with-slider");
      const data = response?.data?.data || [];
      
      const sliderType = data.find(
        (type: SliderTypeWithSliders) => 
          type.name.toLowerCase() === typeName.toLowerCase() && type.isActive
      );
      
      return sliderType?.sliders
        ?.filter((slider: BannerSlider) => slider.isActive)
        ?.sort((a: BannerSlider, b: BannerSlider) => a.order - b.order) || [];
    } catch (error) {
      console.error(`Error fetching ${typeName} sliders:`, error);
      return [];
    }
  }
};