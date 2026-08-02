const prisma = require("../config/prisma");
const { verifyToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    // Expected format: Bearer <token>
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    // Verify JWT
    const decoded = verifyToken(token);

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;