const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//setup routes
const subscriptioRoute = require('./routes/SubscriptionRoute');
const userRoute = require('./routes/UserRoutes');
const studentRoute = require('./routes/StudentRoutes');

//environment varaiables
// require("dotenv").config();
if (process.env.NODE_ENV === "production") {
  require("dotenv").config({
    path: "./.env",
  });
}

const port = 8000;
// const port = process.env.PORT;
const dbconnection = process.env.DB_URL;

mongoose
  .connect(dbconnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connection establised"))
  .catch((error) => console.log("database connection failed.."));

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("AIWEN server is Up!!");
});


//setup api routes
app.use('/api/v1/maillist',subscriptioRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/student',studentRoute);
