const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const morgan = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
const http = require('http');
const https = require('https');
const formidable = require('formidable');
const mentorsRoutes = require('./routes/mentors');
const learnerRoutes = require('./routes/learners');
const authRoutes = require('./routes/auth');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');
const db = require('./db/db.js');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config/config');
// sockets

const server = http.createServer(app);
const socketIo = require('socket.io');

// Utilities
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('./'));
// app.use(session({secret: config.sessionSecret,
// 				 saveUninitialized: true,
// 				 resave: true}));

// Routing
app.use('/api', mentorsRoutes);
app.use('/api', learnerRoutes);
app.use('/api', authRoutes);
app.use('/api', conversationRoutes);
app.use('/api', messageRoutes);


app.get('*', (request, response) =>  {
  response.sendFile(path.resolve(__dirname, '../', 'index.html'));
});

// Sockets
let io = new socketIo(server);
require('./sockets/socketEvents')(io);

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), () => {
  // db.ensureSchema();
  console.log(`${moment().format('h:mm:ss a')  }: Express Server listening on port`, app.get('port'));
});
