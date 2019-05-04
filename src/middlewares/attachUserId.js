const jwt = require("jsonwebtoken");

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const { userId, exp } = jwt.verify(token, process.env.APP_SECRET);
      if (Date.now() / 1000 < exp) {
        req.userId = userId;
        req.isLoggedIn = true;
      }
    } catch (error) {
      req.userId = null;
      req.isLoggedIn = false;
    }
  }
  next();
};
