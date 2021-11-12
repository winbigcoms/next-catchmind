const socketIo = require("socket.io");

function connectSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
    maxHttpBufferSize: 1e8,
  });

  let userArray = [];
  let subTitles = [];
  let subTitle = "";
  let artist = "";
  let duplicateLogin = [];

  io.on("connection", (socket) => {
    socket.on("users", (data) => {
      socket.nickName = data.nickName;
      if (
        userArray.filter((user) => user.nickName === data.nickName).length !== 0
      ) {
        console.log("중복접속");
        duplicateLogin.push(data.nickName);
        io.to(socket.id).emit("alreadLogin");
        return;
      }

      userArray.push(data);

      if (!artist) {
        artist =
          userArray[Math.floor(Math.random() * userArray.length)].nickName;
      }

      io.sockets.emit("recivedUsers", userArray);

      io.to(socket.id).emit("artist", {
        isMyturn: data.nickName === artist ? true : false,
        artist: userArray.filter((data) => data.nickName === artist)[0]
          .nickName,
      });
    });

    socket.on("chatting", (data) => {
      const who = userArray.find((data) => data.nickName === socket.nickName);
      if (data.value === subTitle) {
        io.sockets.emit("goldenCorrect", who.nickName);
        artist =
          userArray[Math.floor(Math.random() * userArray.length)].nickName;
        subTitle = subTitles[Math.floor(Math.random() * 3)];
      }
      io.sockets.emit("chatting", data);
    });

    socket.on("getSubject", () => {
      io.to(socket.id).emit("subject", subTitle);
    });

    socket.on("newGame", () => {
      if (subTitles.length === 0) {
        const collection = mongo.db("catchmind").collection("subtitles");

        collection
          .find({})
          .sort({ _id: -1 })
          .limit(1)
          .toArray()
          .then((res) => {
            subTitles = res[0].subTitles;
            subTitle = res[0].subTitles[Math.floor(Math.random() * 3)];
            console.log(res);
            console.log(subTitles);
            console.log(subTitle);
          })
          .catch((err) => {
            console.log(err);
            client.close();
          });
      } else {
        socket.emit("newGame", {
          subTitle,
          artist: userArray.filter((data) => data.nickName === artist)[0]
            .nickName,
        });
      }
    });

    socket.on("disconnect", () => {
      if (duplicateLogin.includes(socket.nickName)) {
        duplicateLogin = duplicateLogin.filter(
          (data) => data !== socket.nickName
        );
        return;
      }
      userArray = userArray.filter((data) => data.nickName !== socket.nickName);

      socket.broadcast.emit("recivedUsers", userArray);
      if (socket.nickName === artist) {
        artist =
          userArray.length !== 0
            ? userArray[Math.floor(Math.random() * userArray.length)].nickName
            : "";

        const newArtist =
          userArray.length !== 0
            ? userArray.filter((data) => data.nickName === artist)[0].name
            : "";

        socket.broadcast.emit("artistClose", {
          isMyturn: artist,
          artist: newArtist,
        });
      }
    });

    socket.on("drowStart", (path) => {
      socket.broadcast.emit("drowStart", path);
    });

    socket.on("drawing", (path) => {
      socket.broadcast.emit("drawing", path);
    });

    socket.on("resetPaint", () => {
      socket.broadcast.emit("resetPaint");
    });

    socket.on("pencilState", (state) => {
      socket.broadcast.emit("pencilState", state);
    });

    socket.on("color", (hex) => {
      socket.broadcast.emit("color", hex);
    });

    socket.on("pencilStroke", (state) => {
      socket.broadcast.emit("pencilStroke", state);
    });

    socket.on("eraserStroke", (state) => {
      socket.broadcast.emit("eraserStroke", state);
    });

    socket.on("stopPaint", () => {
      socket.broadcast.emit("stopPaint");
    });
  });
}

module.exports = connectSocket;
