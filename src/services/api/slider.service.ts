/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api";

export interface SliderData {
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

export const sliderService = {
  async createSlider(data: SliderData): Promise<any> {
    const response = await api.post("/slider", data);
    return response?.data;
  },

  async getAllSliders(sliderTypeId?: string): Promise<any> {
    const url = sliderTypeId 
      ? `/slider?sliderTypeId=${sliderTypeId}` 
      : "/slider";
    const response = await api.get(url);
    return response?.data;
  },

  async getSliderById(id: string): Promise<any> {
    const response = await api.get(`/slider/${id}`);
    return response?.data;
  },

  async updateSlider(id: string, data: Partial<SliderData>): Promise<any> {
    const response = await api.put(`/slider/${id}`, data);
    return response?.data;
  },

  async deleteSlider(id: string): Promise<any> {
    const response = await api.delete(`/slider/${id}`);
    return response?.data;
  }
};