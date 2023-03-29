const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017",
  collection: "sessions",
});
// * ROUTERS
const auth = require("./routes/auth/auth");

const ENV = "development";
const DOMAIN = ENV === "development" ? "localhost" : "";
const PORT = 6001;

// * Database
require("./database/database");

app.listen(PORT, `${DOMAIN}`, () => {
  console.log(`Server listening on port ${PORT}`);
});
// * MiddleWare
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    key: "userId",
    secret: "LDJRMFISOQKSDPTMGUS!%7OSAD$SAOGb52%7@",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(auth);
