const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
// const flash = require('connect-flash');
// const csrf = require('csurf');

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


const rootDir = require('./util/root');

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', './backend/views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads', 'profiles')));


app.use(
    session({
        secret: 'my secret',
        resave: false, 
        saveUninitialized: false,
        store: store,
    })
)

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');

app.use(authRouter);
app.use(homeRouter)


mongoose.connect(MONGODB_URI)
.then(result =>{
    app.listen(PORT, console.log(`Server listening on port ${PORT}`));
}).catch(err =>{
    console.log(err);
})
