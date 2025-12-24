import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// Dummy user (replace with DB later)
const user = {
  id: "123",
  email: "admin@example.com",
  password: bcrypt.hashSync("123456", 10) // hashed password
};


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check email
  if (email !== user.email) {
    return res.status(401).json({ message: "Invalid credentials" });
  }


  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token
  });
});

export default router;
