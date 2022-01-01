const config = require('config');
const express = require('express');
const mongoose = require ('mongoose');
const users = require('./routes/users.route');
const auth = require('./routes/auth.route');
const app = express();

if (!process.env.jwtPrivateKey) {
    console.log(process.env.jwtPrivateKey);
    console.log(config.jwtPrivateKey);
    process.exit(1);
}


app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/', (req, res) => {
    res.send('Hello World')
});


mongoose.connect('mongodb://localhost:27017/valdo').then(() => {
    console.log('db connected...');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));