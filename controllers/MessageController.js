const MessageModel = require("../Models/MessageModel");

class Message {
  addMessage = async (req, res) => {
    const { senderId, chatId, text } = req.body;
    const message = new MessageModel({
      senderId,
      chatId,
      text,
    });

    try {
      const result = await message.save();

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
      const result = await MessageModel.find({ chatId });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new Message();
