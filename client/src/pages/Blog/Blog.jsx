import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get("/blogs");
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEO
        title="Journal & Healthy Tips"
        description="Read about health benefits of dry fruits, diet tips and recipes on FitBite Journal."
      />
      <div className="pt-32 pb-20 px-4 md:px-10 min-h-screen bg-[#fdfbf7]">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl playfair font-bold text-[#4a3b2a] mb-4">
            Our Journal
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Discover tips, recipes, and stories about healthy living and our
            premium dry fruits.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-[#d4a017]">Loading stories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#4a3b2a]/5"
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4a017] mb-2 block">
                    {blog.category}
                  </span>
                  <h2 className="text-2xl font-playfair font-bold text-[#4a3b2a] mb-4 leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-stone-500 text-sm line-clamp-3 mb-6">
                    {blog.content}
                  </p>

                  {/* Read More Link (Abhi details page nahi hai, but link laga diya) */}
                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center text-[#4a3b2a] font-bold uppercase text-xs tracking-widest hover:text-[#d4a017] transition-colors"
                  >
                    Read Article <i className="ri-arrow-right-line ml-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
