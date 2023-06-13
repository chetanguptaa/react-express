const express = require('express');
const config = require('config');
const log = require('./utils/logger');
const routes = require('./routes');
const cors = require('cors');
const { connect } = require('./utils/connect');

const port = config.get("port");

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(port, async () => {
    await connect();
    log.info(`app is listening on port ${port}`);
})
