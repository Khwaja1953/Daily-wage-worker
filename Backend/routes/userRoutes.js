const express = require('express');
const { handleCustomerSignup,handleWorkerSignup,handleLogin } = require('../controller/userController');
const router = express.Router();

router.post('/signup', (req, res) => {

  const { role } = req.body;
  const normalizedRole = role.trim().toLowerCase()
  
  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  if (normalizedRole === "customer") {
    return handleCustomerSignup();
  }

  if ( normalizedRole === "worker") {
    return handleWorkerSignup();
  }

  return res.status(400).json({ message: "Invalid role" });

});

router.post("/login",handleLogin)

module.exports = router;
