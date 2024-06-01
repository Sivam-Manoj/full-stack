const jwt = require("jsonwebtoken");

const createToken = (res, id) => {
  const payload = { id: id };
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not set in environment variables");
  }

  const token = jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict",
    maxAge: 3600000, // 1 hour in milliseconds
  });
  // Optionally, you can also send the token in the response body
  return token;
};

module.exports = {
  createToken,
};
