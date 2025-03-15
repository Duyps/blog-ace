import React, { useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Editor } from "@tinymce/tinymce-react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drpogu8el/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ewn0pvsu";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [contentImage, setContentImage] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUploadImage = async (event, setImage) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !bannerImage || !contentImage || !content) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        bannerImage,
        contentImage,
        content,
        createdAt: serverTimestamp(),
      });
      alert("Bài viết đã được đăng!");
      setTitle("");
      setBannerImage("");
      setContentImage("");
      setContent("");
    } catch (error) {
      console.error("Lỗi khi đăng bài viết:", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Tạo bài viết mới</h2>

        {/* Nhập tiêu đề */}
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Upload Ảnh Banner */}
        <div>
          <label className="block font-medium text-gray-700">Ảnh Banner:</label>
          <input
            type="file"
            onChange={(e) => handleUploadImage(e, setBannerImage)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
          />
          {uploading && <p className="text-blue-500">Đang tải ảnh...</p>}
          {bannerImage && (
            <img src={bannerImage} alt="Banner" className="w-full h-40 mt-2 object-cover rounded-lg" />
          )}
        </div>

        {/* Upload Ảnh Nội Dung */}
        <div>
          <label className="block font-medium text-gray-700">Ảnh Nội dung:</label>
          <input
            type="file"
            onChange={(e) => handleUploadImage(e, setContentImage)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
          />
          {uploading && <p className="text-blue-500">Đang tải ảnh...</p>}
          {contentImage && (
            <img src={contentImage} alt="Content" className="w-full h-40 mt-2 object-cover rounded-lg" />
          )}
        </div>

        {/* Nhập Nội Dung */}
        <div>
          <label className="block font-medium text-gray-700">Nội dung bài viết:</label>
          <Editor
            apiKey="lb50p5zk7nfqivopy5uq59qyxmr8umd9vr6911o41i9kzxi0"
            value={content}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(newContent) => setContent(newContent)}
          />
        </div>

        {/* Nút Đăng Bài */}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={uploading}
        >
          {uploading ? "Đang tải lên..." : "Đăng bài"}
        </button>
      </form>
    </section>
  );
}
