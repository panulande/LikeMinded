const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash');
const csrf = require('csurf');

dotenv.config();

const rootDir = require('./util/root');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './backend/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

const userRouter = require('./routes/user');

app.use(userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));