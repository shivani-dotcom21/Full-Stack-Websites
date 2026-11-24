const orderModel = require("../../models/orderModel");
var jwt = require("jsonwebtoken");
let Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: "rzp_test_TptCp7MA0ZKo4U",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

orderController = {
  saveOrder: async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.TOKENKEY);
    let { id } = decoded;
    // console.log(id);
    let orderData = req.body;
    if (orderData.paymentMethod == "cod") {
      orderData["orderStatus"] = "processing";
      orderData["userId"] = id;

      // console.log(orderData);
      let savedOrder = await orderModel.create(orderData);
      let obj = {
        status: true,
        message: "Order Save Successfully",
        data: savedOrder,
      };
      res.status(200).json(obj);
    } else {
      //Online Payment
      orderData["userId"] = id;
      let savedOrder = await orderModel.create(orderData);
      const options = {
        amount: 50000, // Amount in the smallest currency unit (e.g., 50000 paise = ₹500)
        currency: "INR",
        receipt: savedOrder._id,
      };
      const order = await razorpay.orders.create(options);

      let orderID = order.id;
      await orderModel.updateOne(
        {
          _id: savedOrder._id,
        },
        {
          $set: { razorpayOrderId: orderID },
        },
      );

      res.status(200).json({
        status: true,
        message: "Online Payment Order Save Successfully",
        order,
        data: order,
      });
    }
  },

  // saveOrder: async (req, res) => {
  //   try {
  //     // 1. Check if Authorization header is present
  //     const authHeader = req.headers.authorization;
  //     if (!authHeader) {
  //       return res.status(401).json({
  //         status: false,
  //         message: "Authorization header is missing",
  //       });
  //     }

  //     // 2. Safely extract token
  //     const parts = authHeader.split(" ");
  //     if (parts.length !== 2) {
  //       return res.status(401).json({
  //         status: false,
  //         message: "Token format is invalid",
  //       });
  //     }

  //     const token = parts[1];

  //     // 3. Verify token
  //     const decoded = jwt.verify(token, process.env.TOKENKEY);
  //     const { id } = decoded;
  //     console.log("User ID:", id);

  //     const orderData = req.body;

  //     // 4. Save order based on payment method
  //     if (orderData.paymentMethod === "cod") {
  //       orderData["orderStatus"] = "processing";
  //       orderData["userId"] = id;

  //       const savedOrder = await orderModel.create(orderData);

  //       return res.status(200).json({
  //         status: true,
  //         message: "Order Save Successfully",
  //         data: savedOrder,
  //       });
  //     } else {
  //       // Online Payment
  //       return res.status(200).json({
  //         status: true,
  //         message: "Online Payment Order Save Successfully",
  //         data: orderData,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error in saveOrder:", error.message);
  //     return res.status(500).json({
  //       status: false,
  //       message: "Something went wrong: " + error.message,
  //     });
  //   }
  // },

  getOrders: (req, res) => {},
  getOrderById: (req, res) => {},
  updateOrderStatus: (req, res) => {},

  updatePaymentStatus: async (req, res) => {
    let { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    let obj = {
      orderStatus: "processing",
      paymentStatus: "Success",
      razorpayPaymentId: razorpay_order_id,
    };

    await orderModel.updateOne(
      {
        razorpayPaymentId: razorpay_order_id,
      },
      {
        $set: {
          obj,
        },
      },
    );
    res.status(200).json({
      status: true,
      message: "Online Payment Order Save Successfully",
    });
  },

  varifyPayment: async (req, res) => {
    let { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    let obj = {
      orderStatus: "processing",
      paymentStatus: "Success",
      razorpayPaymentId: razorpay_payment_id,
    };

    await orderModel.updateOne(
      {
        razorpayOrderId: razorpay_order_id,
      },
      {
        $set: obj,
      },
    );
    res.status(200).json({
      status: true,
      message: " Payment Satatus Updated Successfully",
    });
  },
};
module.exports = orderController;
