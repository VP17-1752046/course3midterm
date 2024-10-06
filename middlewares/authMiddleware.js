import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Don't have token" });

  const bearerToken = token.split(" ")[1];

  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Failed to authentication token" });

    req.user = decoded;
    next();
  });
};
