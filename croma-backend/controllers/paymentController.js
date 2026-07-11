const Payment = require("../models/payment")
const makePayment = async (req, res) => {
  try {

    const payment = await Payment.create({
      user: req.user.id,
      order: req.body.order,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: "Success",
      transactionId: "TXN" + Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Payment Successful",
      payment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getPayments = async (req, res) => {

  try {

    const payments = await Payment.find({
      user: req.user.id,
    })
      .populate("order");

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  makePayment,
  getPayments,
};