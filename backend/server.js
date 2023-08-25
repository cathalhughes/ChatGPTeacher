require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const teacherRouter = require('./teacher/teacher.router');
const app = express();
app.use(express.json());
// const ChatGptController  = require('./controller/chatGpt.controller')

// Allow cors
const cors = require('cors');
app.use(
    cors({
        origin: '*',
    })
);

// Use the routers
app.use('/teacher', teacherRouter);

// app.post('/ask-to-chat-gpt', ChatGptController.askToChatGpt)
// app.get('/', ChatGptController.get)

app.listen(3000, () => console.log('Server running on port 3000'));
