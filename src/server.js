const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const WebSocket = require('ws'); // Importar WebSocket

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);

// Crear el servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Crear servidor WebSocket
const wss = new WebSocket.Server({ server });

// Manejar la conexión WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');

  // Enviar un mensaje al cliente cada vez que se conecta
  ws.send(JSON.stringify({ message: 'Conexión WebSocket establecida' }));

  // Manejar los mensajes entrantes del cliente
  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // Responder al cliente
    ws.send(JSON.stringify({ message: 'Mensaje recibido' }));
  });

  // Manejar cierre de conexión
  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});

// Sincronización de la base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
  })
  .catch((err) => {
    console.error('Error al sincronizar las tablas:', err);
  });


