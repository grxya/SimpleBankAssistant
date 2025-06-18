"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Filter,
  RefreshCw,
  Edit,
  X,
} from "lucide-react";
import { useUser, useUserState } from "../store/hooks/useUserHook";
import { Users, ShieldIcon as ShieldUser, UserRoundCheck } from "lucide-react";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showAddModal, setShowAddModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [editForm, setEditForm] = useState({
    fullname: "",
    email: "",
    role: "USER",
  });

  // const [addForm, setAddForm] = useState({
  //   fullname: "",
  //   email: "",
  //   password: "",
  //   role: "USER",
  // });

  const { users, isLoading } = useUserState();

  const { GetAllUsers, DeleteUser, UpdateUserRole, CreateUser } = useUser();

  useEffect(() => {
    const fetch = async () => await GetAllUsers();
    fetch();
  }, [refreshFlag]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleDeleteUser = async (userId) => {
    try {
      setShowDeleteModal(false);
      const userName = userToDelete?.fullname || "İstifadəçi";
      setUserToDelete(null);

      const userIndex = filteredUsers.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        const updatedUsers = [...filteredUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          isDeleting: true,
        };
        setFilteredUsers(updatedUsers);
      }

      const result = await DeleteUser(userId);

      if (result.meta.requestStatus === "fulfilled") {
        setMessage({ type: "success", text: `${userName} uğurla silindi.` });
        setRefreshFlag((prev) => !prev);

        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 5000);
      } else {
        const updatedUsers = [...filteredUsers];
        if (userIndex !== -1) {
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            isDeleting: false,
          };
          setFilteredUsers(updatedUsers);
        }
        setMessage({
          type: "error",
          text: "İstifadəçi silinərkən xəta baş verdi.",
        });
        console.error("Error deleting user:", result.payload);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      const userIndex = filteredUsers.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        const updatedUsers = [...filteredUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          isDeleting: false,
        };
        setFilteredUsers(updatedUsers);
      }
      setMessage({
        type: "error",
        text: "İstifadəçi silinərkən xəta baş verdi.",
      });
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const userIndex = filteredUsers.findIndex(
        (user) => user.id === userToEdit.id
      );
      if (userIndex !== -1) {
        const updatedUsers = [...filteredUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          isEditing: true,
        };
        setFilteredUsers(updatedUsers);
      }
      setShowEditModal(false);

      const result = await UpdateUserRole(userToEdit.id, editForm.role);

      if (result.meta.requestStatus === "fulfilled") {
        setMessage({ type: "success", text: "İstifadəçi uğurla yeniləndi." });
        setUserToEdit(null);
        setEditForm({ fullname: "", email: "", role: "USER" });
        setRefreshFlag((prev) => !prev);

        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 3000);
      } else {
        setMessage({
          type: "error",
          text: "İstifadəçi yenilənərkən xəta baş verdi.",
        });
        const updatedUsers = [...filteredUsers];
        const userIndex = filteredUsers.findIndex(
          (user) => user.id === userToEdit.id
        );
        if (userIndex !== -1) {
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            isEditing: false,
          };
          setFilteredUsers(updatedUsers);
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage({
        type: "error",
        text: "İstifadəçi yenilənərkən xəta baş verdi.",
      });
      const updatedUsers = [...filteredUsers];
      const userIndex = filteredUsers.findIndex(
        (user) => user.id === userToEdit.id
      );
      if (userIndex !== -1) {
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          isEditing: false,
        };
        setFilteredUsers(updatedUsers);
      }
    }
  };

  // const handleAddUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await CreateUser(addForm);

  //     if (result.meta.requestStatus === "fulfilled") {
  //       setMessage({
  //         type: "success",
  //         text: "Yeni istifadəçi uğurla əlavə edildi.",
  //       });
  //       setShowAddModal(false);
  //       setAddForm({ fullname: "", email: "", password: "", role: "USER" });
  //       setRefreshFlag((prev) => !prev);

  //       setTimeout(() => {
  //         setMessage({ type: "", text: "" });
  //       }, 3000);
  //     } else {
  //       setMessage({
  //         type: "error",
  //         text: "İstifadəçi əlavə edilərkən xəta baş verdi.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     setMessage({
  //       type: "error",
  //       text: "İstifadəçi əlavə edilərkən xəta baş verdi.",
  //     });
  //   }
  // };

  const openEditModal = (user) => {
    if (user.isEditing) return;
    setUserToEdit(user);
    setEditForm({
      fullname: user.fullname || "",
      email: user.email || "",
      role: user.role || "USER",
    });
    setShowEditModal(true);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-500 dark:border-gray-600 dark:border-t-amber-400"></div>
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            İstifadəçilər yüklənir...
          </span>
        </div>
      </div>
    );
  }
  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p
            className={`text-2xl font-bold ${color} dark:${color.replace(
              "600",
              "400"
            )}`}
          >
            {value}
          </p>
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("text-", "bg-")
            .replace("-600", "-100")} dark:${color
            .replace("text-", "bg-")
            .replace("-600", "-900")} dark:bg-opacity-20`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          İstifadəçi İdarəetməsi
        </h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setRefreshFlag((prev) => !prev)}
            disabled={isLoading}
            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Yenilə
          </button>
          {/* <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #14b8a6 100%)",
              boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Yeni İstifadəçi
          </button> */}
        </div>
      </div>
      {message.text && (
        <div
          className={`p-4 rounded-lg border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
              : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{message.text}</span>
            <button
              onClick={() => setMessage({ type: "", text: "" })}
              className="ml-4 text-sm underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="İstifadəçi axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ümumi İstifadəçilər"
          value={users.length}
          icon={<Users className="h-6 w-6" />}
          color="text-amber-600"
        />
        <StatCard
          title="Adi İstifadəçilər"
          value={users.filter((user) => user.role === "USER").length}
          icon={<UserRoundCheck className="h-6 w-6" />}
          color="text-teal-600"
        />
        <StatCard
          title="Admin İstifadəçilər"
          value={users.filter((user) => user.role === "ADMIN").length}
          icon={<ShieldUser className="h-6 w-6" />}
          color="text-lime-600"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  İstifadəçi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers
                .sort((a, b) => b.id - a.id)
                .map((user, index) => (
                  <tr
                    key={user.id || index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #f59e0b 0%, #14b8a6 100%)",
                          }}
                        >
                          <span className="text-sm font-medium text-white">
                            {user.fullname?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.fullname || "İstifadəçi"}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          disabled={user.isEditing}
                          className={`${
                            user.isEditing
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                          } transition-colors`}
                        >
                          {user.isEditing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-amber-500"></div>
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteModal(true);
                          }}
                          disabled={user.isDeleting}
                          className={`${
                            user.isDeleting
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          } transition-colors`}
                        >
                          {user.isDeleting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-red-500"></div>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {/* {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-lg p-6 w-full max-w-md mx-4 border backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(245, 158, 11, 0.2)",
              boxShadow:
                "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(245, 158, 11, 0.1)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-lg font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #14b8a6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Yeni İstifadəçi Əlavə Et
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddForm({
                    fullname: "",
                    email: "",
                    password: "",
                    role: "USER",
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={addForm.fullname}
                  onChange={(e) =>
                    setAddForm({ ...addForm, fullname: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={addForm.email}
                  onChange={(e) =>
                    setAddForm({ ...addForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şifrə
                </label>
                <input
                  type="password"
                  required
                  value={addForm.password}
                  onChange={(e) =>
                    setAddForm({ ...addForm, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  value={addForm.role}
                  onChange={(e) =>
                    setAddForm({ ...addForm, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="USER">İstifadəçi</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setAddForm({
                      fullname: "",
                      email: "",
                      password: "",
                      role: "USER",
                    });
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #14b8a6 100%)",
                    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  Əlavə et
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-lg p-6 w-full max-w-md mx-4 border backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(245, 158, 11, 0.2)",
              boxShadow:
                "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(245, 158, 11, 0.1)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-lg font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #14b8a6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                İstifadəçini Redaktə Et
              </h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setUserToEdit(null);
                  setEditForm({ fullname: "", email: "", role: "USER" });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  disabled
                  required
                  placeholder={editForm.fullname}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  required
                  placeholder={editForm.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şifrə
                </label>
                <input
                  type="password"
                  disabled
                  placeholder="Şifrə dəyişdirilə bilməz"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  value={editForm.role}
                  onChange={(e) =>
                    setEditForm({ ...editForm, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="USER">İstifadəçi</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setUserToEdit(null);
                    setEditForm({ fullname: "", email: "", role: "USER" });
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #14b8a6 100%)",
                    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  Yenilə
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-lg p-6 w-full max-w-md mx-4 border backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(245, 158, 11, 0.2)",
              boxShadow:
                "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(245, 158, 11, 0.1)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #14b8a6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              İstifadəçini Sil
            </h3>
            <p className="text-gray-600 mb-6">
              "{userToDelete?.fullname}" istifadəçisini silmək istədiyinizə
              əminsiniz? Bu əməliyyat geri alına bilməz.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ləğv et
              </button>
              <button
                onClick={() => handleDeleteUser(userToDelete.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
