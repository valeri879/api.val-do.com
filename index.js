require("dotenv").config();
const express = require("express");
const app = express();
require("./start/routes.start")(app);
require("./start/db.start")();

const fs = require('fs');
const sharp = require('sharp');

fs.readdirSync('uploads').forEach(file => {
    // console.log(file)
    const imgRegex = /\.(jpg|png|jpeg)\b/i;
    if (imgRegex.test(file)) {
        sharp(`./uploads/${file}`).resize({ width: 320 }).toFile(`./uploads/small/${file}`).then(() => { });
    }
})


if (!process.env.PRIVATE_KEY) {
	process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
