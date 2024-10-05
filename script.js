// Importar Socket.IO
const socket = io('http://localhost:5500'); // Asegúrate de que la URL coincida con tu servidor

// Manejo de la lógica de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async function(event) { 
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (data.success) {
        // Redirige al formulario de envío si las credenciales son correctas
        window.location.href = 'index.html'; 
    } else {
        // Muestra mensaje de error si las credenciales son incorrectas
        document.getElementById('errorMessage').textContent = 'Credenciales incorrectas.';
    }
});

// Función para crear una alerta
async function createAlert(message, userId) {
    const response = await fetch('http://localhost:5500/alerts/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, userId }),
    });

    const data = await response.json();
    if (data.success) {
        console.log('Alerta creada con éxito:', data.alert);
        document.getElementById('alertMessage').textContent = 'Alerta creada con éxito';

        // Emitir la notificación a través de Socket.IO
        socket.emit('sendNotification', { message: 'Nueva alerta creada: ' + message });
    } else {
        console.error('Error al crear la alerta:', data.error);
        document.getElementById('alertMessage').textContent = 'Error al crear la alerta';
    }
}
socket.on('notification', (data) => {
    const notificationsDiv = document.getElementById('notifications');
    notificationsDiv.innerHTML += `<p>${data.message}</p>`; 
});

// Manejar el botón de alerta
document.getElementById('alertButton').addEventListener('click', function() {
    const message = "Nueva alerta de prueba"; // Mensaje de alerta
    const userId = 1; // Simulación de ID de usuario (cambiar según necesidad)
    createAlert(message, userId); // Llamada a la función de crear alerta
});

// Manejar notificaciones en tiempo real
socket.on('notification', (data) => {
    // Mostrar la notificación en la interfaz
    console.log('Notificación recibida:', data.message);
    alert(data.message); 
});
