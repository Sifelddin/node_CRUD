require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverRide = require('method-override');
const { send } = require('process');
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));

//app.use(express.static(path.resolve('../assets')))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverRide('_method'));
//fs.readFile('../Tableau.html')

const subscribersRouter = require('./routes/subscribers');
app.use('/', subscribersRouter);

app.listen(3000, () => console.log('server starting ....'));
