const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
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
app.use(helmet()); // security headers
app.use(express.json({ limit: "10kb" })); // body size limit
// app.use(morgan("dev")); // request logs

const allowedOrigins = [
  "https://fitbite-store.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow non-browser tools (Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 min
  max: 1000, // 100 requests per IP
  message: "Too many requests from this IP, try again later"
});

app.use("/api", limiter);

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