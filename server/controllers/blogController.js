const Blog = require('../models/Blog');

// @desc    Get all blogs (Public)
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 }); // Newest first
  res.json(blogs);
};

// @desc    Get single blog (Public)
const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', 'name');
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

// @desc    Create a blog (Admin Only)
const createBlog = async (req, res) => {
  const { title, image, content, category } = req.body;

  const blog = new Blog({
    title,
    image,
    content,
    category,
    user: req.user._id, // Admin ki ID
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
};

// @desc    Delete a blog (Admin Only)
const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.deleteOne();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

// @desc    Update a blog (Admin Only)
const updateBlog = async (req, res) => {
  const { title, image, content, category } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.image = image || blog.image;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, deleteBlog, updateBlog };