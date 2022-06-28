import {createServer} from 'http';
import express from 'express';
import dotenv from 'dotenv';
const config = require('config');

dotenv.config();

import "./core/db";
import createRoutes from "./core/routes";
import createSocket from "./core/socket";

const app = express()
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

http.listen(config.get('port-chat'), () => {
  console.log(`Server: http://localhost:${config.get('port-chat')}`)
})