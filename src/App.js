import './App.css';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin/AdminLogin';
import AdminDashboard from './components/admin/admin-dashboard/AdminDashboard';
import Home from './components/user/home/Home';
import ProtectedRoute from './components/admin/AdminLogin/ProtectedRoute';
import PostDetail from './components/user/home/PostDetail';
import Blog from './Blog';
import Header from './components/user/common/Header';
import Footer from './components/user/common/Footer';
import About from './components/user/about/About';
import Contact from './components/user/contact/Contact';

function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />} {/* Chỉ hiển thị Header nếu không phải trang Admin */}
      <Routes>
        {/* Trang User */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<PostDetail />} />

        {/* Trang Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdminPage && <Footer />}

    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
