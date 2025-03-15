import React, { useState, useEffect } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drpogu8el/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ewn0pvsu";

export default function ImageUploader() {
  const [images, setImages] = useState(() => {
    return JSON.parse(localStorage.getItem("uploadedImages")) || [];
  });

  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(images));
  }, [images]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      // Cập nhật danh sách ảnh (thêm ảnh mới vào danh sách cũ)
      setImages((prevImages) => [...prevImages, data.secure_url]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input type="file" onChange={handleImageUpload} className="mb-4" />
      <p>Danh sách ảnh đã tải lên:</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((url, index) => (
          <img key={index} src={url} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg shadow" />
        ))}
      </div>
    </div>
  );
}
