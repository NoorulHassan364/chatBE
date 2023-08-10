const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

module.exports = socketConnection = () => {
  let activeUsers = [];

  io.on("connection", (socket) => {
    console.log("socket connected");
    // Register a user on Socket Server
    socket.on("new-user-add", (newUserId) => {
      // if user is already  exist then its not go inside if statement
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({
          userId: newUserId,
          socketId: socket.id,
        });
      }

      // show all active users
      // console.log("activeUsers after", activeUsers);
      io.emit("get-users", activeUsers);
    });

    // this Event whose time trigger when any user is disconnected
    socket.on("disconnect", () => {
      // socket.id is automattically detect which user is disconnected
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // show remaining active users
      io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });

    // Show Typing

    socket.on("sendTyping", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);

      if (user) {
        io.to(user.socketId).emit("typing", data);
      }
    });

    // STop Typing

    socket.on("stopTyping", (data) => {
      console.log("data", data);

      const { receiverId } = data;
      console.log("receiverId", receiverId);
      console.log("activeUsers", activeUsers);

      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("user", user);

      if (user) {
        console.log("inside");
        io.to(user.socketId).emit("typing", false);
      }
    });
  });
};
