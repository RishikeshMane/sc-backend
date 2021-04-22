const router = require("express").Router();
const vol = require("../models/volounteer");
const multer = require('multer');
var nodemailer = require('nodemailer');
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/volenteer/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/img') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: fileFilter
});

router.get("/", async (req, res) => {
  try {
    const aliens = await vol.find();
    res.json(aliens);
    console.log(aliens)
  } catch (err) {
    res.send("Error " + err);
  }
});


router.post('/', upload.single('image'), async (req, res) => {
  console.log('req vol');
  // console.log(req.body);
  console.log("file",req.file);
  console.log(req.image);
  const { Name, Number1, Number2, Email, Address, City, State, Zipcode, Qualification, Profession, Facebooklink, Twitterlink, Instagramlink, Reasontocontribute, Hours, Days } = req.body;
 // try {
    const volset = new vol({
      name: Name,
      number1: Number1,
      number2: Number2,
      email: Email,
      address: Address,
      city: City,
      state: State,
      zipcode: Zipcode,
      qualification: Qualification,
      profession: Profession,
      facebooklink: Facebooklink,
      twitterlink: Twitterlink,
      instagramlink: Instagramlink,
      reasontocontribute: Reasontocontribute,
      hours: Hours,
      days: Days,
      image: req.file.path
    });

    //send email

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    });
    
    var mailOptions = {
      from: 'rexspecsadam007@gmail.com',
      to: 'geeksforrex@gmail.com',
      subject: 'Sending Email using Node.js',
      text: `Hi Smartherd, thank you for your nice Node.js tutorials.
              I will donate 50$ for this course. Please send me payment options.`
      // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    
    try {
      const a1 = await volset.save();
    // console.log(a1)
    return res.status(200).send(a1)
    } catch (error) {
      console.log(error);
         return res.status(500).send({ err, msg: "something went wrong " })
    }



    

});


module.exports = router;
