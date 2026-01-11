import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/axios";
import SEO from "../../components/SEO";
const BlogDetails = () => {
  const { id } = useParams(); // URL se ID nikalo
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get(`/blogs/${id}`);
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog details");
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen pt-40 text-center text-[#d4a017] font-bold">
        Loading article...
      </div>
    );
  if (!blog)
    return (
      <div className="min-h-screen pt-40 text-center text-red-500">
        Blog not found.
      </div>
    );

  return (
    <div className="pt-32 pb-20 px-4 md:px-10 min-h-screen bg-[#fdfbf7]">
      <SEO 
        title={blog.title} 
        description={blog.content.substring(0, 150)}
        image={blog.image}
      />

      <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-xl overflow-hidden border border-[#4a3b2a]/5">
        {/* HERO IMAGE */}
        <div className="h-[300px] md:h-[500px] w-full relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
            <span className="bg-[#d4a017] text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold leading-tight mb-2">
              {blog.title}
            </h1>
            <p className="text-sm opacity-80 uppercase tracking-wide">
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="p-8 md:p-12">
          {/* 'whitespace-pre-line' se paragraphs apne aap ban jayenge */}
          <div className="text-stone-600 text-lg leading-relaxed whitespace-pre-line font-serif">
            {blog.content}
          </div>

          {/* AUTHOR SECTION (Optional) */}
          <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4a3b2a] rounded-full flex items-center justify-center text-[#d4a017] font-bold text-xl">
                F
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase font-bold">
                  Written by
                </p>
                <p className="font-bold text-[#4a3b2a]">FitBite Team</p>
              </div>
            </div>

            <Link
              to="/blog"
              className="text-[#4a3b2a] font-bold hover:text-[#d4a017] transition flex items-center gap-2"
            >
              <i className="ri-arrow-left-line"></i> Back to Journal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
