/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api";

export interface SliderTypeData {
  name: string;
  description?: string;
  iconUrl?: string;
  isActive?: boolean;
}

export const sliderTypeService = {
  async createSliderType(data: SliderTypeData): Promise<any> {
    const response = await api.post("/slider-type", data);
    return response?.data;
  },

  async getAllSliderTypes(): Promise<any> {
    const response = await api.get("/slider-type");
    return response?.data;
  },

  async getSliderTypeWithSliders(): Promise<any> {
    const response = await api.get("/slider-type/get-all-type-with-slider");
    return response?.data;
  },

  async getSliderTypeById(id: string): Promise<any> {
    const response = await api.get(`/slider-type/${id}`);
    return response?.data;
  },

  async updateSliderType(id: string, data: Partial<SliderTypeData>): Promise<any> {
    const response = await api.put(`/slider-type/${id}`, data);
    return response?.data;
  },

  async deleteSliderType(id: string): Promise<any> {
    const response = await api.delete(`/slider-type/${id}`);
    return response?.data;
  }
};