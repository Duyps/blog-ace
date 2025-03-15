import React, { useState } from "react";
import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputBox from "../InputBox";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-dashboard");
    } catch (err) {
      alert("Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-[90%] max-w-[400px] bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleLogin}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Đăng nhập Admin
        </h1>
        <InputBox
          name="email"
          type="text"
          placeholder="demo@gmail.com"
          icon="envelope"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          name="password"
          type="password"
          placeholder="demo123456"
          icon="key"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-6 hover:bg-blue-700 transition duration-300"
        >
          Đăng nhập
        </button>
      </form>
    </section>
  );
}

export default AdminLogin;
