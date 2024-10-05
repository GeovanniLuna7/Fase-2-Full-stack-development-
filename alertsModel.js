// Simular una base de datos en memoria
let alertsDatabase = [];

// Agregar una nueva alerta
const addAlert = (message, userId) => {
    const newAlert = {
        id: alertsDatabase.length + 1,
        message,
        userId,
        timestamp: new Date().toISOString(),
    };
    
    alertsDatabase.push(newAlert);
    return newAlert;
};

// Obtener todas las alertas
const fetchAlerts = () => {
    return alertsDatabase;
};

module.exports = { addAlert, fetchAlerts };
