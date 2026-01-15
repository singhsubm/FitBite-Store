const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const ownerRoutes = require('./routes/ownerRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const blogRoutes = require('./routes/blogRoutes');
const queryRoutes = require('./routes/queryRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

// Config
dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());
// app.use(cors());

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", 
    credentials: true
}));

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/owner', ownerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/newsletter', newsletterRoutes);

// ERROR HANDLING MIDDLEWARE (Agar koi API fat jaye to ye sambhal lega)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));