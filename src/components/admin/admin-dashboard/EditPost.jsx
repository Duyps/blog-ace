import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Editor } from "@tinymce/tinymce-react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drpogu8el/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ewn0pvsu";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [contentImage, setContentImage] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setBannerImage(data.bannerImage);
        setContentImage(data.contentImage);
        setContent(data.content);
      } else {
        console.log("Không tìm thấy bài viết!");
      }
    };

    fetchPost();
  }, [id]);

  const handleUploadImage = async (event, setImage) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      const data = await response.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
    }
    setUploading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !bannerImage || !contentImage || !content) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        title,
        bannerImage,
        contentImage,
        content,
      });

      alert("Bài viết đã được cập nhật!");
      navigate("../manage-post");
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
    setSaving(false);
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Chỉnh sửa bài viết
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tiêu đề bài viết</label>
            <input
              type="text"
              placeholder="Nhập tiêu đề..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Ảnh Banner</label>
            <input type="file" onChange={(e) => handleUploadImage(e, setBannerImage)} className="mb-2" />
            {uploading && <p className="text-sm text-gray-500">Đang tải ảnh...</p>}
            {bannerImage && <img src={bannerImage} alt="Banner" className="w-full h-48 object-cover rounded-lg shadow-md" />}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Ảnh Nội dung</label>
            <input type="file" onChange={(e) => handleUploadImage(e, setContentImage)} className="mb-2" />
            {uploading && <p className="text-sm text-gray-500">Đang tải ảnh...</p>}
            {contentImage && <img src={contentImage} alt="Content" className="w-full h-48 object-cover rounded-lg shadow-md" />}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Nội dung bài viết</label>
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

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={saving}
          >
            {saving ? "Đang cập nhật..." : "Cập nhật bài viết"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;
