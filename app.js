const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();



const http = require('http').createServer(app)

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000'
    }
})


app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
http.listen(4000);

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    },
  })
);

mongoose
  .connect(process.env.MONGO_KEY)
  .then((res) => {
    console.log("connection good");
  })
  .catch((e) => {
    console.log(e);
  });


  app.set('socketio', io)


const router = require("./routes/main");
app.use("/", router);
