const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer')
const uploads = multer({dest:"./uploads/"});
const fs = require('fs')
const Cors = require("cors");

const app = express();
const url = " mongodb://127.0.0.1:27017/socieycare";


app.use(Cors());
app.use(express.json());

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














// app.use(express.urlencoded({ extended: true }));

// app.post('/uploadfile',uploads.single('avtar'),(req,res)=>{
//   let fileType = req.file.mimetype.split('/')[1];
//   let newfileName = req.file.filename + '-' + fileType;
//   console.log('./uploads/${newfileName}');
//   fs.rename(
//     './uploads/${req.file.filename}',
//     './uploads/${newFileName}',
//   )
//   console.log('calback')
//   res.send("200")
// })