require('dotenv/config')
const express = require("express");
const route = require('./src/routes/routes');
const app = express();
const cors = require('cors')

require('./src/database/index');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(route)
const port = process.env.port || 4000;
app.listen(port, () => {
    console.log(`Servidor conectado na porta ${ port }`)
});