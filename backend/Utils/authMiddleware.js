const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "annachi_kadai_secret";

/**
 * verifyToken — middleware that checks Bearer JWT in Authorization header.
 * Attaches decoded payload to req.user if valid.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

/**
 * verifyAdmin — use AFTER verifyToken.
 * Blocks non-admin users.
 */
function verifyAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
}

module.exports = { verifyToken, verifyAdmin };
