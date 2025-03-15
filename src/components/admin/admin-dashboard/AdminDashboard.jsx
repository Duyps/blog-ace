import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import Sidebar from "./Sidebar";
import CreatePost from "./CreatePost";
import ManagePost from "./ManagePost";
import EditPost from "./EditPost";
function AdminDashboard() {
  const navigate = useNavigate();

  // Xử lý đăng xuất
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin"); // Chuyển về trang đăng nhập
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Nội dung chính */}
      <div className="ml-64 p-6 w-full">
        <Routes>
          <Route path="create-post" element={<CreatePost />} />
          <Route path="manage-post" element={<ManagePost />} />
          <Route path="edit/:id" element={<EditPost/>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
