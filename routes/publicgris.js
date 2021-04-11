const router = require("express").Router();
const Alien = require("../models/publicgri");
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/lodge/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/img' || file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})


router.get("/", async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    res.send("Error " + err);
  }
});


router.post("/", upload.array('image', 12), async (req, res) => {
  console.log(req.body);
  const { Name, Mobileno, Email, Pincode, Department, Locality, Siteaddress, Complaintaddress, Reasontocontribute } = req.body;
  let arr = [];
  req.files.map(f => arr.push(f.path));
  const alien = new Alien({
    name: Name,
    mobileno: Mobileno,
    email: Email,
    pincode: Pincode,
    department: Department,
    locality: Locality,
    siteaddress: Siteaddress,
    complaintaddress: Complaintaddress,
    reasontocontribute: Reasontocontribute,
    images: arr
  });
  //try {
    const a1 = await alien.save();
    return res.status(200).send(a1)
  //} catch (err) {
    return res.status(500).send({ err, "msg": "Something went wrong" })
  //}
});



module.exports = router;
