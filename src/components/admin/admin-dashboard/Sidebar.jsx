import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-3">
            <button
              onClick={() => navigate("/admin-dashboard/create-post")}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              📝 Thêm bài viết
            </button>
          </li>
          <li className="mb-3">
            <button
              onClick={() => navigate("/admin-dashboard/manage-post")}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              📂 Quản lý bài viết
            </button>
          </li>
        </ul>
      </div>

      {/* Nút Chuyển sang trang User + Đăng xuất */}
      <div className="mt-auto">
        <button
          onClick={() => navigate("/")}
          className="w-full mb-3 px-3 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          🌍 Trang User
        </button>

        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          🚪 Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
