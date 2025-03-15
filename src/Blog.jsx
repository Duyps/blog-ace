import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "./firebaseConfig";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drpogu8el/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ewn0pvsu";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsArray);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !imageUrl) return alert("Vui lòng nhập đủ thông tin!");

    if (editId) {
      const postRef = doc(db, "posts", editId);
      await updateDoc(postRef, { title, content, imageUrl });
      setEditId(null);
    } else {
      await addDoc(collection(db, "posts"), { title, content, imageUrl });
    }
    
    setTitle("");
    setContent("");
    setImageUrl("");
    fetchPosts();
  };

  const handeDelete = async(id) => {
    if (window.confirm("Are you sure????")){
      await deleteDoc(doc(db, "posts", id));
      fetchPosts();
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">{editId ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}</h2>
      <input type="text" placeholder="Tiêu đề" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border mb-2" />
      
      {/* TinyMCE Editor */}
      <Editor
        apiKey="lb50p5zk7nfqivopy5uq59qyxmr8umd9vr6911o41i9kzxi0" // Lấy API Key từ https://www.tiny.cloud/
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 300,
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
      />

      <input type="file" onChange={handleImageUpload} className="mb-2" />
      {imageUrl && <img src={imageUrl} alt="Banner" className="w-full h-40 object-cover mb-2" />}
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">{editId ? "Lưu chỉnh sửa" : "Đăng bài"}</button>

      <h2 className="text-xl font-bold mt-6">Danh sách bài viết</h2>
      {posts.map(post => (
        <div key={post.id} className="border p-4 my-2">
          <img src={post.imageUrl} alt="Banner" className="w-full h-40 object-cover mb-2" />
          <h3 className="font-bold">{post.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          <button onClick={() => { setEditId(post.id); setTitle(post.title); setContent(post.content); setImageUrl(post.imageUrl); }} className="text-blue-500">Chỉnh sửa</button>
          <button onClick={() => handeDelete(post.id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
}


