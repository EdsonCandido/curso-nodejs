const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const app = express();

//Config passport
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI;

//Connect Mongo
mongoose.connect(db, { useNewUrlParser: true, })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//BodyParser
app.use(express.urlencoded({ extended: true }));

//Express Session
app.use(session({
    secret: 'segredo',
    resave: true,
    saveUninitialized: true,
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Flash 
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.susses_msg = req.flash('susses_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
});


//Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));