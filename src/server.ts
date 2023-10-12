import express from 'express';
import WebSocket from 'ws';
import { PrismaClient } from '@prisma/client';
import listenForTaskChanges from './tasks/tasks.websocket';

import authController from './auth/auth.controller';
import taskController from './tasks/tasks.controller';

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

listenForTaskChanges(server);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// register the auth controller
app.use('/auth', authController);
app.use('/tasks', taskController);


// Add more routes as needed
