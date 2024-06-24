const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
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
app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads', 'profiles')));

const userRouter = require('./routes/user');

app.use(userRouter);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(result =>{
    app.listen(PORT, console.log(`Server listening on port ${PORT}`));
}).catch(err =>{
    console.log(err);
})
