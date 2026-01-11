import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';

const AdminBlog = () => {
  const { showToast } = useToast();
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'Health',
    image: '',
    content: ''
  });

  // 1. Fetch All Blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await API.get('/blogs');
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 2. Handle Form Submit (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Update Logic
        await API.put(`/blogs/${formData.id}`, formData);
        showToast("Blog Updated!", "success");
      } else {
        // Create Logic
        await API.post('/blogs', formData);
        showToast("Blog Created!", "success");
      }
      
      // Reset & Refresh
      setFormData({ id: '', title: '', category: 'Health', image: '', content: '' });
      setIsEditing(false);
      fetchBlogs();

    } catch (error) {
      showToast(error.response?.data?.message || "Something went wrong", "error");
    }
  };

  // 3. Delete Blog
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await API.delete(`/blogs/${id}`);
        showToast("Blog Deleted", "info");
        fetchBlogs();
      } catch (error) {
        showToast("Delete Failed", "error");
      }
    }
  };

  // 4. Edit Click Handler
  const handleEdit = (blog) => {
    setFormData({
      id: blog._id,
      title: blog.title,
      category: blog.category,
      image: blog.image,
      content: blog.content
    });
    setIsEditing(true);
    window.scrollTo(0,0); // Form upar hai, wahan le jao
  };

  return (
    <div className="p-6 md:p-10 mt-15 pt-32 min-h-screen bg-[#fdfbf7]">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-3xl font-playfair font-bold text-[#4a3b2a]">
             {isEditing ? 'Edit Blog' : 'Blog Manager'}
           </h1>
           {isEditing && (
             <button onClick={() => { setIsEditing(false); setFormData({ id: '', title: '', category: 'Health', image: '', content: '' }) }} className="text-sm underline text-red-500">Cancel Edit</button>
           )}
        </div>

        {/* === BLOG FORM === */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#4a3b2a]/5 mb-12">
           <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input 
                   type="text" placeholder="Blog Title" required
                   value={formData.title}
                   onChange={(e) => setFormData({...formData, title: e.target.value})}
                   className="p-3 border rounded-lg outline-none focus:border-[#d4a017]"
                 />
                 <input 
                   type="text" placeholder="Category (e.g. Health, Tips)" required
                   value={formData.category}
                   onChange={(e) => setFormData({...formData, category: e.target.value})}
                   className="p-3 border rounded-lg outline-none focus:border-[#d4a017]"
                 />
              </div>
              
              <input 
                 type="text" placeholder="Image URL (e.g. https://image.com/img.jpg)" required
                 value={formData.image}
                 onChange={(e) => setFormData({...formData, image: e.target.value})}
                 className="w-full p-3 border rounded-lg outline-none focus:border-[#d4a017]"
              />

              <textarea 
                 rows="6" placeholder="Write your blog content here..." required
                 value={formData.content}
                 onChange={(e) => setFormData({...formData, content: e.target.value})}
                 className="w-full p-3 border rounded-lg outline-none focus:border-[#d4a017]"
              ></textarea>

              <button type="submit" className="bg-[#4a3b2a] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4a017] transition w-full md:w-auto">
                 {isEditing ? 'Update Blog' : 'Publish Blog'}
              </button>
           </form>
        </div>

        {/* === EXISTING BLOGS LIST === */}
        <h2 className="text-xl font-bold text-[#4a3b2a] mb-6">Published Blogs ({blogs.length})</h2>
        
        <div className="space-y-4">
           {blogs.map(blog => (
              <div key={blog._id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex gap-4 items-center">
                 <img src={blog.image} alt={blog.title} className="w-20 h-20 object-cover rounded-lg" />
                 
                 <div className="flex-1">
                    <h3 className="font-bold text-[#4a3b2a]">{blog.title}</h3>
                    <p className="text-xs text-stone-500 uppercase">{blog.category} • {new Date(blog.createdAt).toLocaleDateString()}</p>
                 </div>

                 <div className="flex gap-2">
                    <button onClick={() => handleEdit(blog)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"><i className="ri-pencil-line"></i></button>
                    <button onClick={() => handleDelete(blog._id)} className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"><i className="ri-delete-bin-line"></i></button>
                 </div>
              </div>
           ))}
           {blogs.length === 0 && <p className="text-center text-stone-400">No blogs yet.</p>}
        </div>

      </div>
    </div>
  );
};

export default AdminBlog;