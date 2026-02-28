/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api";

export interface User {
  _id: string;
  name: string;
  email?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  isDeleted: boolean;
  phone?: string;
  picture?: string;
  address?: string;
  referralCode?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  picture?: string;
  referralCode?: string;
  isVerified?: boolean;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface UserResponse {
  success: boolean;
  data: User;
}

export const userService = {
  // Get all users with pagination and search
  async getAllUsers(params?: { search?: string; page?: number; limit?: number }) {
    const response = await api.get("/admin", { params });
    return response?.data;
  },

  // Get single user by ID
  async getUserById(id: string) {
    const response = await api.get(`/admin/${id}`);
    return response?.data;
  },

  // Update user details
  async updateUser(id: string, data: UpdateUserData) {
    const response = await api.patch(`/admin/${id}`, data);
    return response?.data;
  },

  // Change user status
  async changeUserStatus(id: string, status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED') {
    const response = await api.patch(`/admin/${id}/status`, { status });
    return response?.data;
  },

  // Change user role
  async changeUserRole(id: string, role: 'USER' | 'ADMIN' | 'SUPER_ADMIN') {
    const response = await api.patch(`/admin/${id}/role`, { role });
    return response?.data;
  },

  // Delete user (soft delete)
  async deleteUser(id: string) {
    const response = await api.delete(`/admin/${id}`);
    return response?.data;
  },
};