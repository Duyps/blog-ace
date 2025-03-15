import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig';
import { Link } from 'react-router-dom';
import './home.css'
import AboutDetail from '../about/AboutDetail';
import PostBanner from './PostBanner';
import PageAnimation from '../common/PageAnimation';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      window.scrollTo(0,0);

    const fetchPosts = async () => {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        
        setPosts(fetchedPosts);
    };

    fetchPosts();
    }, []);
  return (
    <PageAnimation>
    <div className="home-container">
      {posts.map((post,index) => (
        <Link to={`/post/${post.id}`} key={post.id} className={`post-card ${index%4 ===3 ? 'large-post': ''}`}>
          <PostBanner key={post.id} post={post}/>
          <div className="infor">
            <p className="post-date">{new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
            <h2 className="post-title">{post.title}</h2>
            <p className='decs'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio non, incidunt praesentium soluta nostrum, velit id veritatis temporibus, debitis et aliquid quo? Totam obcaecati illum dicta vero eum quidem ab.</p>
          </div>
          
        </Link>
      ))}
    </div>
    <AboutDetail/>
    </PageAnimation>
  )
}

export default Home