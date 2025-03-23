const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

const PORT = 3000;
app.listen(PORT, () => {});
