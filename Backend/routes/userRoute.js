const express = require('express');
const { handleCustomerSignup } = require('../controller/customerController');
const { handleWorkerSignup } = require('../controller/workerController');

const router = express.Router();

router.post('/signup', (req, res) => {

  const { role } = req.body;
  
  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  if (role === "customer") {
    return handleCustomerSignup(req, res);
  }

  if (role === "worker") {
    return handleWorkerSignup(req, res);
  }

  return res.status(400).json({ message: "Invalid role" });

});

module.exports = router;
