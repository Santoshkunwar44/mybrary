const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/author");
require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
// app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
// const DB =
//   "mongodb+srv://santosh:admin2@cluster0.tme9l.mongodb.net/mybrary?retryWrites=true&w=majority";santosh

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MONGOdb"))
  .catch((err) => console.log(err));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 3000);
