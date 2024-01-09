import jwt from "jsonwebtoken";

const authencateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Please login again.",
        variant: "error"
      });
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (error, user) => {
        if (error) {
          return res.status(401).json({
            message: "Please login again.",
            variant: "error"
          });
        }

        req.user = user;
        next();
      }
    );
  } catch (e) {
    res.status(401).json({
      message: "Please login again.",
      variant: "error"
    });
  }
};

export { authencateToken };
