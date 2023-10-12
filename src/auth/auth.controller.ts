import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Generate a JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? 'D3F4ULT_S3CR3T');

  res.json({ token });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    // Generate a JWT
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET ?? 'D3F4ULT_S3CR3T');

    res.json({ token });
    return;
  }

  // Check the password
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate a JWT
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET ?? 'D3F4ULT_S3CR3T');

  res.json({ token });
});

export default router;
