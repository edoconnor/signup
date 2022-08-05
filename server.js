const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index')
const runnerRouter = require('./routes/runners')

const mongoose = require("mongoose");
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('App is connected to MongoDB'))

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter)
app.use('/runners', runnerRouter)

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
