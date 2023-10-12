import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient, TaskState } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = express.Router();

router.use('/', async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'D3F4ULT_S3CR3T');
    if (typeof decoded === 'string') throw new Error('Invalid token');
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
    });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  const { title, description, priority, state } = req.body;
  console.log(req.body)

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      state,
    },
  });
  res.json(task);
});

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Get a single task by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id },
  });
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Update a task by ID
router.patch('/:id', async (req: Request, res: Response) => {
  console.log(req.body)
  const { id } = req.params;
  const { title, description, priority, state } = req.body;
  const task = await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      priority,
      state,
    },
  });
  res.json(task);
});

// Delete a task by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id },
  });
  res.json({ message: 'Task deleted' });
});

export default router;

