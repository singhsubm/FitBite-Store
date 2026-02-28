const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Sirf Logged in user)
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      // stock minus
      for (const item of orderItems) {
        const product = await Product.findById(item.product);

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < item.qty) {
          return res.status(400).json({ message: "Out of stock" });
        }

        console.log(
          `Updating Stock for ${product.name}: Old=${product.stock}, Sold=${item.qty}`
        );

        product.stock = product.stock - Number(item.qty);
        await product.save();
      }

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin

const getOrders = async (req, res) => {
  const orders = await Order.find({ isDeleted: { $ne: true } })
    .populate("user", "id name")
    .sort({ createdAt: -1 });
  res.json(orders);
};

const updateOrderToDelivered = async (req, res) => {
  const { status } = req.body; // Frontend se status aayega (Shipped/Delivered etc.)
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderStatus = status;

    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else {
      order.isDelivered = false;
      order.deliveredAt = null;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
// @desc    Delete / Cancel order (Soft delete + Stock restore)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // ❌ Agar already deleted hai to dobara stock mat badhao
  if (order.isDeleted) {
    return res.status(400).json({ message: "Order already deleted" });
  }

  // 🔁 1️⃣ STOCK WAPAS ADD KARO
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);

    if (product) {
      product.stock += item.qty;
      await product.save();
    }
  }

  // 🔴 2️⃣ ORDER STATUS CANCEL KARO
  order.orderStatus = "Cancelled";
  order.isDeleted = true;

  await order.save();

  res.json({ message: "Order cancelled and stock restored" });
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  deleteOrder,
};
