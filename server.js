const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const homeRoutes = require('./routes/home_page_routes');
const app = express();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8000;

app.use((req,res,next) => {
    console.log(req.path,req.method);
    next()
})
app.use(express.json());

app.get('/test-server', (req,res) => {
    res.send("Server is working");
})

app.use('/api/user', userRoutes)
app.use('/api/home-page', homeRoutes)

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(8000, () => {
            console.log('connected to DB and server listening on port', PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })