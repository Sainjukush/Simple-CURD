const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const mongoose  = require("mongoose");

const cors =  require("cors");
app.use(cors());

app.use(express.json()); 

const userDataRoute = require("./routes/userDataRoute");

//Connect to mongodb database(locally)
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen
    (process.env.PORT || 5000, (err) => 
      {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    }
    );
  })
  .catch((error) => console.log("Failed to connect", error));
 
  app.use(userDataRoute);