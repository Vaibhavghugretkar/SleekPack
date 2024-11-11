const express= require('express');
const cookieParser= require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const indexRouter = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const expressSession = require('express-session');
const flash = require("connect-flash");

const app = express();
require('dotenv').config();

//******session code for flash.use()*******//
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:"ajasdjbcnvsdbkvn"
    })
)
app.use(flash());

// app.use((req, res, next) => {
//     res.locals.messages = req.flash();
//     next();
// });



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/owners', ownersRouter);



app.listen(3000);