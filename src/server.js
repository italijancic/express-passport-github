import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookie from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'

import passport from './utils/passport.utils.js'

import routes from './routes/index.routes.js'

if (process.env.MONGO_URI) import("./config/db.js");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie())
app.use(session({
  store: new mongoStore({
    mongoUrl: process.env.MONGO_URI,
    options: {
      userNewUrlparser: true,
      useUnifiedTopology: true,
    }
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 100000 }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`🔥 Server started on http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));
