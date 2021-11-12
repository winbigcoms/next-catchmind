const router = require("express").Router();
const multer = require("multer");
const mongoClient = require("../../connection/mongo");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, req.body.name + file.originalname);
    },
  }),
});

router.post("/api/signUp", upload.single("image"), async (req, res) => {
  const { name, nickName } = req.body;
  const image = req.body.name + req.file.originalname;
  try {
    mongoClient.connect(async (err) => {
      mongoClient.db("catchmind").collection("user").insertOne({
        name,
        nickName,
        image,
      });

      res.send(true);
    });
  } catch (e) {
    res.send(false);
  }
});

module.exports = router;
