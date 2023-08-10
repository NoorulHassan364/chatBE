const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// routes
const AuthRoute = require("./routes/AuthRoute.js");
const ChatRoute = require("./routes/ChatRoute.js");
const MessageRoute = require("./routes/MessageRoute.js");
const UserRoute = require("./routes/UserRoute.js");
const socketConnection = require("./sockets/sockets.js");

const app = express();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

dotenv.config();
const PORT = 5000;

const CONNECTION = "mongodb://127.0.0.1:27017/Chat";

mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Listening at Port ${PORT} Database Connect`);
      socketConnection();
    })
  )
  .catch((error) => console.log(`${error} did not connect`));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
