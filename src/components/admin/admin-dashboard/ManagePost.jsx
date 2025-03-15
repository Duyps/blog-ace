import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

function ManagePost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPosts(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchPosts();
  }, []);

  const handleEdit = (postId) => {
    navigate(`/admin-dashboard/edit/${postId}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài này?")) {
      setLoading(true);
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter((post) => post.id !== id));
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Quản lý bài viết
        </h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  {post.bannerImage ? (
                    <img
                      src={post.bannerImage}
                      alt="Banner"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-gray-500">Không có ảnh</span>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-gray-500 text-sm">
                      Ngày đăng:{" "}
                      {post.createdAt
                        ? new Date(
                            post.createdAt.seconds * 1000
                          ).toLocaleDateString()
                        : "Không có ngày"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Đang xóa..." : "Xóa"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ManagePost;
