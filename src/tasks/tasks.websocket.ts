// websocket listen to the tasks

import WebSocket from 'ws';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function listenForTaskChanges(server: any) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws) => {
    console.log('WebSocket connection established');
    let tasks = await prisma.task.findMany();
    ws.send(JSON.stringify(tasks));

    const interval = setInterval(async () => {
      const newTasks = await prisma.task.findMany();
      // check for differences
      if (newTasks.length !== tasks.length
        || newTasks.some((newTask, i) => newTask.id !== tasks[i].id)
        || newTasks.some((newTask, i) => newTask.title !== tasks[i].title)
        || newTasks.some((newTask, i) => newTask.description !== tasks[i].description)
        || newTasks.some((newTask, i) => newTask.priority !== tasks[i].priority)
        || newTasks.some((newTask, i) => newTask.state !== tasks[i].state)
      ) {
        tasks = newTasks;
        ws.send(JSON.stringify(tasks));
      }
    }, 1000);


    ws.on('close', () => {
      console.log('WebSocket connection closed');
      clearInterval(interval);
    });
  });
}
