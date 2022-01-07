const config = require('config');
const express = require('express');
const app = express();
require('./start/routes.start')(app);
require('./start/db.start')();

if (!process.env.jwtPrivateKey) {
    console.log(process.env.jwtPrivateKey);
    console.log(config.jwtPrivateKey);
    process.exit(1);
}



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));