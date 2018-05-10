import http from 'http';
import express from 'express';
import dotEnv from 'dotenv';
import socketIO from 'socket.io';
import sockets from '../sockets';
import expressApp from './expressApp';

dotEnv.config();

const app = expressApp(express());
const port = parseInt(process.env.PORT, 10) || 5000;
const server = http.createServer(app);
const io = socketIO(server);

app.set('port', port);
sockets(io);


app.get('/', (req, res) =>
  res.status(200).send('Welcome to More-Recipe'));

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;