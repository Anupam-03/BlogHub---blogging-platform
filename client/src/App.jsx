// import { useState } from 'react'
// import './App.css'

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/home/Home';
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/Nopage";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";

import Profile from './pages/Profile';
import Search from './pages/Search';
import BlogForm from './components/Blog/BlogForm';
import BlogPost from './components/Blog/BlogPost';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { Logout } from './components/Auth/Logout';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

import MyState from "./context/data/myState";
import { Toaster } from "react-hot-toast";
import CreateBlog from './pages/admin/createBlog/createBlog';



const App = () => {
  return (
    <MyState>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>} />
          <Route path="/createblog" element={
            <ProtectedRouteForAdmin>
              <CreateBlog />
            </ProtectedRouteForAdmin>} />
          <Route path="/*" element={<NoPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/posts/create" element={<BlogForm />} />
          <Route path="/posts/edit/:id" element={<BlogForm />} />
          <Route path="/posts/:id" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <Footer /> */}
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;


export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('admin'))
  if (admin?.user?.email === "testuser1@gmail.com") {
    return children
  }
  else {
    return <Navigate to={'/adminlogin'} />
  }
}