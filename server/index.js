require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ErrorHandler } = require("./Middlewares/ErrorMiddleware");
const cookieParser = require("cookie-parser");
const { ConnectMongoDb } = require("./Config/db");

const app = express();
const port = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

//database
ConnectMongoDb();

//routes
app.use("/user", require("./Routes/UserRoutes"));

//error handler
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
