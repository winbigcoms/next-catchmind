const socketIo = require("socket.io");
const mongoClient = require("./mongo");

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

  mongoClient.connect(async (err) => {
    const findedSubtitle = await mongoClient
      .db("catchmind")
      .collection("subtitles")
      .findOne()
      .then((res) => res);

    subTitles = findedSubtitle.subTitles;
    subTitle = subTitles[Math.floor(Math.random() * subTitles.length)];

    mongoClient.close();
  });

  io.on("connection", (socket) => {
    socket.on("users", (data) => {
      socket.nickName = data.nickName;

      if (
        userArray.filter((user) => user.nickName === data.nickName).length !== 0
      ) {
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
      }
      io.sockets.emit("chatting", data);
    });

    socket.on("getSubject", () => {
      io.to(socket.id).emit("subject", subTitle);
    });

    socket.on("newGame", () => {
      subTitle = subTitles[Math.floor(Math.random() * subTitles.length)];
      artist = userArray[Math.floor(Math.random() * userArray.length)].nickName;

      io.sockets.emit("newGame", {
        subTitle,
        artist: artist,
      });
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
            ? userArray.filter((data) => data.nickName === artist)[0].nickName
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
