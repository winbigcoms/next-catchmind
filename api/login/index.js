const router = require("express").Router();
const mongoClient = require("../../connection/mongo");
const fs = require("fs");

router.get("/api/checkNickName", (req, res) => {
  const { nickName } = req.query;

  mongoClient.connect(async (err) => {
    const findedUserName = await mongoClient
      .db("catchmind")
      .collection("user")
      .findOne({
        nickName,
      })
      .then((res) => res);

    const result = findedUserName ? true : false;

    res.send(result);

    mongoClient.close();
  });
  return;
});

router.post("/api/login", (req, res) => {
  try {
    const { name: reqName } = req.body;
    mongoClient.connect(async (err) => {
      const findedUserName = await mongoClient
        .db("catchmind")
        .collection("user")
        .findOne({
          name: reqName,
        })
        .then((res) => res);

      const { nickName, name, image } = findedUserName;

      const imgFile = fs.readFileSync("uploads/" + image, "base64");

      res.send({
        nickName,
        imgFile,
        name,
      });

      mongoClient.close();
    });
  } catch (err) {
    console.log(err);
    res.send(false);
  }
});

module.exports = router;
