// const jwt = require('jsonwebtoken');
// const jwt_secret = "gayatri@11";

// const fetchuser = (req, res, next) => {
//   const token = req.header('auth-token');

//   if (!token) {
//     return res.status(401).send("Access denied");
//   }

//   try {
//     const data = jwt.verify(token, jwt_secret);
//     req.user = data.user;
//     next();
//   } catch (error) {
//     return res.status(401).send("Invalid token");
//   }
// };

// module.exports = fetchuser;

const jwt = require("jsonwebtoken");
const jwt_secret = "gayatri@11";

const fetchuser = (req, res, next) => {
  // Get token from header
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = fetchuser;
