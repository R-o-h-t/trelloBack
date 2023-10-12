import express from 'express';
import WebSocket from 'ws';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`You sent: ${message}`);
  });
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Add more routes as needed
