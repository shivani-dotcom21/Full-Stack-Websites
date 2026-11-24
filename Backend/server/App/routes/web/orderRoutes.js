let express = require("express");
const orderController = require("../../controllers/web/orderController");
let orderRoutes = express.Router();

orderRoutes.post("/place-order", orderController.saveOrder);
orderRoutes.get("/get-orders", orderController.getOrders);
orderRoutes.get("/get-orders/:id", orderController.getOrderById);
orderRoutes.post("/update-order-status/:id", orderController.updateOrderStatus);
orderRoutes.post('/varify-payment', orderController.varifyPayment)
orderRoutes.post("/update-payment-status/:id", orderController.updatePaymentStatus);

module.exports = orderRoutes
