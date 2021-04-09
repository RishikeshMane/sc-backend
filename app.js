const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");

const app = express();
const url = " mongodb://127.0.0.1:27017/socieycare";


app.use(Cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//mongoose connection
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const con = mongoose.connection;

con.on("open", () => {
  console.log("connectedon...");
});


const publicgri = require("./routes/publicgris");
app.use("/prgi", publicgri);

const volurouter = require("./routes/volounteer");
app.use("/volu", volurouter);



//server listining
app.listen(7000, () => {
  console.log("Server started on");
});
