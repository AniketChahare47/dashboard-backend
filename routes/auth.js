const express = require('express');
const User = require('../module/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../fetch/fetchuser');
const jwt_secret = "gayatri@11";


// ================== CREATE USER (SIGNUP) ==================
router.post(
  '/createuser',
  [
    body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: false,
          error: "Sorry, a user with this email already exists"
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });

      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, jwt_secret);
      res.json({ success: true, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);


// ================== LOGIN USER ==================
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "Please login with correct credentials"
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success: false,
          error: "Please login with correct credentials"
        });
      }

      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, jwt_secret);
      res.json({ success: true, authtoken });

    } catch (error) {
      console.error("LOGIN ERROR 👉", error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);


// ================== GET LOGGED-IN USER ==================
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
