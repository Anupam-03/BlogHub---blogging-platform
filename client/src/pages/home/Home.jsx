import React, { useEffect } from 'react';
import BlogList from '../../components/Blog/BlogList';
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection';
import BlogPostCard from '../../components/blogPostCard/BlogPostCard';
import Loader from '../../components/loader/Loader';

export function Home() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <Layout>
                {/* <h1>Home</h1> */}
                <HeroSection />
                <BlogPostCard />
                <Loader />
                {/* <BlogList /> */}
            </Layout>
        </div>
    );
};