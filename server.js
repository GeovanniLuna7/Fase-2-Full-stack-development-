const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { checkCredentials } = require('./auth');
const alertsRoutes = require('./alerts/routes');
const http = require('http'); // Importar http para crear un servidor
const { Server } = require('socket.io'); // Importar Server de socket.io

// Inicializar la aplicación Express
const app = express();
const server = http.createServer(app); // Crear el servidor HTTP
const io = new Server(server); // Crear el servidor de Socket.IO

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Habilitar JSON en solicitudes

// Ruta para el login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (checkCredentials(username, password)) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Rutas para manejar alertas
app.use('/alerts', alertsRoutes); // Definir las rutas de alertas bajo /alerts

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Emitir una notificación de prueba
    socket.emit('notification', { message: 'Bienvenido a las notificaciones en tiempo real!' });

    // Escuchar el evento 'sendNotification' desde el cliente
    socket.on('sendNotification', (data) => {
        // Emitir la notificación a todos los clientes conectados
        io.emit('notification', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Iniciar el servidor
const PORT = 5500; // Puedes unificar ambos servicios en el mismo puerto
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
