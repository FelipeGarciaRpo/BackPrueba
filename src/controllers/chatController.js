const Message = require('../models/Message');
const User = require('../models/User');

// Obtener todos los mensajes del chat
const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: {
        model: User,
        attributes: ['name', 'username', 'role'],
      },
      order: [['createdAt', 'ASC']],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los mensajes', error });
  }
};

// Enviar un nuevo mensaje
const sendMessage = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  try {
    const message = await Message.create({ content, userId });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el mensaje', error });
  }
};

module.exports = { getMessages, sendMessage };