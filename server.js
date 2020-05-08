if (process.env.NODE_ENV !== "production")
{
    require("dotenv").config();
};

const express = require("express");
const app = express();
const expresslayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/indexlayout");

const indexRouter = require("./routes/index");
const fifaRouter = require("./routes/fifarouter");
const biljardiRouter = require("./routes/biljardirouter");

app.use(expresslayouts);
app.use("/", indexRouter);
app.use("/fifa", fifaRouter);
app.use("/biljardi", biljardiRouter);


app.listen(process.env.PORT || 3000);