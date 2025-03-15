import React, { useEffect, useState, useRef } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, doc, getDoc, getDocs,  query, orderBy, limit, queryEqual } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import './home.css'; // Import file CSS
import PostBanner from './PostBanner';
import Writter from '../common/Writter';
import PageAnimation from '../common/PageAnimation';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const latestPostsRef = useRef(null);

  // Lấy chi tiết bài viết
  useEffect(() => {
    window.scrollTo(0,0);

    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    };
    fetchPost();
  }, [id]);

  // Lấy danh sách 6 bài viết mới nhất (trừ bài hiện tại)
  useEffect(() => {
    const fetchLatestPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(post => post.id !== id); // Loại bỏ bài viết hiện tại

      setLatestPosts(posts);
    };

    fetchLatestPosts();
  }, [id]);

  if (!post) return <p className="loading">Loading...</p>;

  // Hàm cuộn danh sách sang trái/phải
  const scrollLatestPosts = (direction) => {
    if (latestPostsRef.current) {
      latestPostsRef.current.scrollBy({ left: direction * 300, behavior: "smooth" });
    }
  };
  return (
    <PageAnimation>
    <div className="post-detail-container">
        <div className="heading">
            <h1 className='type'>Article</h1>
            <div className="infor">
                <p className="post-date">{new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
                <h1 className="post-title">{post.title}</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, vero obcaecati sequi sapiente ut cumque distinctio laudantium numquam minima eum, soluta iusto! Iure at ut eligendi ex aperiam maiores optio.</p>
            </div>
        </div>
        
      <img src={post.contentImage} alt={post.title} className="post-image" />
      {/* Render nội dung có chứa HTML */}
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
    <Writter pic="https://cdn.prod.website-files.com/610af3ee7c0d5125cc13a0e9/610af3ee7c0d5100c913a2ca_Avatar_3.png" name="Dalia Holmes"/>
    <div className="latest-section">
        <h2>Latest</h2>
        <div className="latest-container">
          <div className="latest-posts" ref={latestPostsRef}>
            {latestPosts.map(latestPost => (
              <Link to={`/post/${latestPost.id}`} key={latestPost.id} className="latest-card">
                <PostBanner post={latestPost}/>
                <h3 className="latest-date">{new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</h3>
                <h3 className="latest-title">{latestPost.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageAnimation>
  );
}

export default PostDetail;
