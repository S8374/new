/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  User as UserIcon,
  Mail,
  Calendar,
  Power,
  Trash2,
  X,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  Phone,
  MapPin,
  Award,
  Ban,
  Edit,
  Save,
  Camera,
  Link as LinkIcon
} from "lucide-react";
import { userService, User, UpdateUserData } from "@/services/api/admin.service";

type StatusType = 'all' | 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
type RoleType = 'all' | 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'USER' | 'ADMIN' | 'SUPER_ADMIN'>('USER');
  const [selectedStatus, setSelectedStatus] = useState<'ACTIVE' | 'INACTIVE' | 'BLOCKED'>('ACTIVE');
  const [filterStatus, setFilterStatus] = useState<StatusType>('all');
  const [filterRole, setFilterRole] = useState<RoleType>('all');
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
console.log("totalUsers",totalUsers);
  // Edit form state
  const [editForm, setEditForm] = useState<UpdateUserData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    picture: '',
    referralCode: '',
    isVerified: false
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {
        page: currentPage,
        limit: 10,
      };
      
      if (debouncedSearch) {
        params.search = debouncedSearch;
      }

      const response = await userService.getAllUsers(params);
      
      if (response?.success) {
        // Handle different response structures
        let userData = [];
        if (Array.isArray(response.data)) {
          userData = response.data;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          userData = response.data.data;
        }
        
        setUsers(userData);
        
        // Handle meta data
        if (response.meta) {
          setTotalUsers(response.meta.total || 0);
          setTotalPages(Math.ceil((response.meta.total || 0) / 10));
        }
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on status and role
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    
    return users.filter(user => {
      // Status filter
      if (filterStatus !== 'all' && user.isActive !== filterStatus) return false;
      
      // Role filter
      if (filterRole !== 'all' && user.role !== filterRole) return false;
      
      return true;
    });
  }, [users, filterStatus, filterRole]);

  // Handle edit user
  const handleEditUser = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);
      await userService.updateUser(selectedUser._id, editForm);
      await fetchUsers();
      setShowEditModal(false);
      setSelectedUser(null);
      setEditForm({});
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user details");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle status change
  const handleStatusChange = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);
      await userService.changeUserStatus(selectedUser._id, selectedStatus);
      await fetchUsers();
      setShowStatusModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to change user status:", error);
      alert("Failed to update user status");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle role change
  const handleRoleChange = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);
      await userService.changeUserRole(selectedUser._id, selectedRole);
      await fetchUsers();
      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to change user role:", error);
      alert("Failed to update user role");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to delete ${user.name}? This action can be reversed.`)) {
      return;
    }

    try {
      setActionLoading(true);
      await userService.deleteUser(user._id);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal with user data
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      picture: user.picture || '',
      referralCode: user.referralCode || '',
      isVerified: user.isVerified || false
    });
    setShowEditModal(true);
  };

  // Get role badge color and display name
  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return {
          badge: 'bg-red-600/20 text-red-400 border-red-600/30',
          icon: <ShieldAlert className="w-4 h-4" />,
          display: 'Super Admin'
        };
      case 'ADMIN':
        return {
          badge: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
          icon: <ShieldCheck className="w-4 h-4" />,
          display: 'Admin'
        };
      default:
        return {
          badge: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
          icon: <Shield className="w-4 h-4" />,
          display: 'User'
        };
    }
  };

  // Get status badge color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return {
          badge: 'bg-green-600/20 text-green-400 border border-green-600/30',
          icon: <CheckCircle className="w-3 h-3" />,
          display: 'Active'
        };
      case 'INACTIVE':
        return {
          badge: 'bg-gray-600/20 text-gray-400 border border-gray-600/30',
          icon: <XCircle className="w-3 h-3" />,
          display: 'Inactive'
        };
      case 'BLOCKED':
        return {
          badge: 'bg-red-600/20 text-red-400 border border-red-600/30',
          icon: <Ban className="w-3 h-3" />,
          display: 'Blocked'
        };
      default:
        return {
          badge: 'bg-gray-600/20 text-gray-400 border border-gray-600/30',
          icon: <XCircle className="w-3 h-3" />,
          display: status
        };
    }
  };

  // Safe array check for rendering
  const safeUsers = Array.isArray(filteredUsers) ? filteredUsers : [];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">User Management</h1>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                suppressHydrationWarning
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as StatusType)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                suppressHydrationWarning
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="BLOCKED">Blocked</option>
              </select>

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as RoleType)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                suppressHydrationWarning
              >
                <option value="all">All Roles</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>

              {/* Refresh Button */}
              <button
                onClick={fetchUsers}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                suppressHydrationWarning
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-600 border-t-blue-500"></div>
              <p className="text-gray-400 mt-2">Loading users...</p>
            </div>
          ) : safeUsers.length === 0 ? (
            <div className="p-8 text-center">
              <UserIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {safeUsers.map((user) => {
                    const roleInfo = getRoleInfo(user.role);
                    const statusInfo = getStatusInfo(user.isActive);
                    return (
                      <tr key={user._id} className="hover:bg-gray-750 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold overflow-hidden">
                              {user.picture ? (
                                <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                user.name?.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-400">{user.email || 'No email'}</p>
                              {user.phone && (
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                  <Phone className="w-3 h-3" /> {user.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${roleInfo.badge}`}>
                            {roleInfo.icon}
                            {roleInfo.display}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusInfo.badge}`}>
                            {statusInfo.icon}
                            {statusInfo.display}
                          </span>
                          {user.isVerified && (
                            <span className="ml-2 text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {/* View Details */}
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserModal(true);
                              }}
                              className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-colors"
                              title="View Details"
                              suppressHydrationWarning
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Edit User */}
                            <button
                              onClick={() => openEditModal(user)}
                              className="p-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg transition-colors"
                              title="Edit User"
                              suppressHydrationWarning
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Change Role */}
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setSelectedRole(user.role);
                                setShowRoleModal(true);
                              }}
                              className="p-2 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 rounded-lg transition-colors"
                              title="Change Role"
                              suppressHydrationWarning
                            >
                              <Shield className="w-4 h-4" />
                            </button>

                            {/* Change Status */}
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setSelectedStatus(user.isActive);
                                setShowStatusModal(true);
                              }}
                              className="p-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 rounded-lg transition-colors"
                              title="Change Status"
                              suppressHydrationWarning
                            >
                              <Power className="w-4 h-4" />
                            </button>

                            {/* Delete User */}
                            <button
                              onClick={() => handleDeleteUser(user)}
                              disabled={actionLoading}
                              className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors"
                              title="Delete User"
                              suppressHydrationWarning
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 bg-gray-750 border-t border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  suppressHydrationWarning
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  suppressHydrationWarning
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-white"
                suppressHydrationWarning
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {selectedUser.picture ? (
                    <img src={selectedUser.picture} alt={selectedUser.name} className="w-full h-full object-cover" />
                  ) : (
                    selectedUser.name?.charAt(0).toUpperCase()
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Name:</span>
                  <span className="text-white ml-auto">{selectedUser.name}</span>
                </div>
                
                {selectedUser.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Email:</span>
                    <span className="text-white ml-auto">{selectedUser.email}</span>
                  </div>
                )}
                
                {selectedUser.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Phone:</span>
                    <span className="text-white ml-auto">{selectedUser.phone}</span>
                  </div>
                )}
                
                {selectedUser.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Address:</span>
                    <span className="text-white ml-auto">{selectedUser.address}</span>
                  </div>
                )}
                
                {selectedUser.referralCode && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Referral:</span>
                    <span className="text-white ml-auto">{selectedUser.referralCode}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Role:</span>
                  <span className={`ml-auto px-2 py-1 rounded-full text-xs ${getRoleInfo(selectedUser.role).badge}`}>
                    {getRoleInfo(selectedUser.role).display}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Power className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Status:</span>
                  <span className={`ml-auto px-2 py-1 rounded-full text-xs ${getStatusInfo(selectedUser.isActive).badge}`}>
                    {getStatusInfo(selectedUser.isActive).icon}
                    {getStatusInfo(selectedUser.isActive).display}
                  </span>
                </div>
                
                {selectedUser.isVerified && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Verified:</span>
                    <span className="text-green-400 ml-auto">Yes</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Joined:</span>
                  <span className="text-white ml-auto">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    openEditModal(selectedUser);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  suppressHydrationWarning
                >
                  Edit Details
                </button>
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    setSelectedRole(selectedUser.role);
                    setShowRoleModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                  suppressHydrationWarning
                >
                  Change Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
                suppressHydrationWarning
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditUser();
            }} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Address
                </label>
                <textarea
                  value={editForm.address || ''}
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Picture URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Picture URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={editForm.picture || ''}
                    onChange={(e) => setEditForm({...editForm, picture: e.target.value})}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  {editForm.picture && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={editForm.picture} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Referral Code
                </label>
                <input
                  type="text"
                  value={editForm.referralCode || ''}
                  onChange={(e) => setEditForm({...editForm, referralCode: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Verified Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVerified"
                  checked={editForm.isVerified || false}
                  onChange={(e) => setEditForm({...editForm, isVerified: e.target.checked})}
                  className="h-4 w-4 text-blue-600 rounded bg-gray-700 border-gray-600"
                />
                <label htmlFor="isVerified" className="ml-2 text-sm text-gray-300">
                  Verified User
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                  suppressHydrationWarning
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  suppressHydrationWarning
                >
                  <Save className="w-4 h-4" />
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Change User Role</h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-gray-400 hover:text-white"
                suppressHydrationWarning
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-300 mb-4">
              Change role for <span className="font-bold text-white">{selectedUser.name}</span>
            </p>

            <div className="space-y-3 mb-6">
              {(['USER', 'ADMIN', 'SUPER_ADMIN'] as const).map((role) => {
                const roleInfo = getRoleInfo(role);
                return (
                  <label
                    key={role}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedRole === role
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={selectedRole === role}
                      onChange={(e) => setSelectedRole(e.target.value as any)}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`p-2 rounded-full ${
                        role === 'SUPER_ADMIN' ? 'bg-red-600/20' :
                        role === 'ADMIN' ? 'bg-yellow-600/20' :
                        'bg-blue-600/20'
                      }`}>
                        {roleInfo.icon}
                      </span>
                      <div>
                        <p className="font-medium text-white">{roleInfo.display}</p>
                        <p className="text-xs text-gray-400">
                          {role === 'SUPER_ADMIN' ? 'Full access to all features' :
                           role === 'ADMIN' ? 'Can manage content and users' :
                           'Basic user access'}
                        </p>
                      </div>
                    </div>
                    {selectedRole === role && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                suppressHydrationWarning
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                disabled={actionLoading || selectedRole === selectedUser.role}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                suppressHydrationWarning
              >
                {actionLoading ? 'Updating...' : 'Update Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      {showStatusModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Change User Status</h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-400 hover:text-white"
                suppressHydrationWarning
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-300 mb-4">
              Change status for <span className="font-bold text-white">{selectedUser.name}</span>
            </p>

            <div className="space-y-3 mb-6">
              {(['ACTIVE', 'INACTIVE', 'BLOCKED'] as const).map((status) => {
                const statusInfo = getStatusInfo(status);
                return (
                  <label
                    key={status}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedStatus === status
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={(e) => setSelectedStatus(e.target.value as any)}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`p-2 rounded-full ${
                        status === 'ACTIVE' ? 'bg-green-600/20' :
                        status === 'INACTIVE' ? 'bg-gray-600/20' :
                        'bg-red-600/20'
                      }`}>
                        {statusInfo.icon}
                      </span>
                      <div>
                        <p className="font-medium text-white">{statusInfo.display}</p>
                        <p className="text-xs text-gray-400">
                          {status === 'ACTIVE' ? 'User can access the platform' :
                           status === 'INACTIVE' ? 'User cannot access the platform' :
                           'User is blocked from the platform'}
                        </p>
                      </div>
                    </div>
                    {selectedStatus === status && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                suppressHydrationWarning
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                disabled={actionLoading || selectedStatus === selectedUser.isActive}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                suppressHydrationWarning
              >
                {actionLoading ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}