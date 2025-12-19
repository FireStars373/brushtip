import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey"; // use process.env.JWT_SECRET in production

export default function verifyTokenOptional(req, res, next) {
  console.log("🔹 verifyTokenOptional middleware triggered");

  if (req.method === "OPTIONS") return res.sendStatus(200);

  const authHeader = req.headers.authorization;

  // 🔓 No token → continue as unauthenticated
  if (!authHeader) {
    req.id = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.id = decoded.id; // authenticated user
    next();
  } catch (err) {
    // 🚫 Token was provided but invalid
    return res.status(401).json({ message: "Invalid token" });
  }
}

