const express= require('express');
const cookieParser= require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/owners', ownersRouter);



app.listen(3000);