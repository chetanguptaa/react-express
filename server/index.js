const express = require('express');
const config = require('config');
const log = require('./utils/logger');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const cors = require('cors');
const { connect } = require('./utils/connect');
const multer = require('multer');
const helmet = require('helmet');
const { auth } = require('./middleware/authentication');
const path = require('path');
const app = express();

const port = config.get("port");

const __fileName = path.resolve(module.filename);
const __dirName = path.dirname(__fileName);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirName, 'public/assets'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    } 
})

const upload = multer({
    storage
})
app.use('/assets', express.static('public/assets'));
app.post('/posts', auth, upload.single("picture"));
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}))
app.use(cors());
app.use(express.json());

app.listen(port, async () => {
    await connect();
    log.info(`app is listening on port ${port}`);
})
