if (process.env.NODE_ENV !== "production")
{
    require("dotenv").config();
};

const express = require("express");
const app = express();
const expresslayouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
// connects to DATABSE_URL string in ./env/
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.on("open", () => console.log("Connected to Mongoose"));


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/indexlayout");

const indexRouter = require("./routes/index");
const fifaRouter = require("./routes/fifarouter");
const biljardiRouter = require("./routes/biljardirouter");

app.use(expresslayouts);
app.use(express.static, (__dirname + "/public");)
app.use("/", indexRouter);
app.use("/fifa", fifaRouter);
app.use("/biljardi", biljardiRouter);


app.listen(process.env.PORT || 3000);