import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey"; // use process.env.JWT_SECRET in production

export default function verifyToken(req, res, next) {
    console.log("🔹 verifyToken middleware triggered");
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    // Expected format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.id = decoded.id;


        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}
