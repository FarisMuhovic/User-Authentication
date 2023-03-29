// * Importing the required modules
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// * Environment
const ENV = "development";
const DOMAIN = ENV === "development" ? "localhost" : "";
const PORT = 6001;

// * Database
require("./database/database");

const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017",
  collection: "sessions",
});

// * Express App
const app = express();
app.listen(PORT, `${DOMAIN}`, () => {
  console.log(`Server listening on port ${PORT}`);
});

// * MiddleWare
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    },
  })
);

app.use(express.json());
// * ROUTERS
const auth = require("./routes/auth/auth");
app.use(auth);
