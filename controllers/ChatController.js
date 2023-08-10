const ChatModel = require("../Models/ChatModel");

class Chat {
  createChat = async (req, res) => {
    let newChat = new ChatModel({
      members: [req.body.senderId, req.body.recieverId],
    });

    try {
      const result = await newChat.save();

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  userChats = async (req, res) => {
    try {
      const chat = await ChatModel.find({
        members: { $in: [req.params.userId] },
      });

      res.status(200).json(chat);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  findChat = async (req, res) => {
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });

      res.status(200).json(chat);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new Chat();
