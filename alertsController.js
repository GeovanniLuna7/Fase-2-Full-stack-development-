const { addAlert, fetchAlerts } = require('./alertsModel');

// Crear una nueva alerta
const createAlert = (req, res) => {
    const { message, userId } = req.body;
    
    if (!message || !userId) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }
    
    const newAlert = addAlert(message, userId);
    return res.status(201).json({ success: true, alert: newAlert });
};

// Obtener todas las alertas
const getAlerts = (req, res) => {
    const alerts = fetchAlerts();
    return res.status(200).json({ success: true, alerts });
};

module.exports = { createAlert, getAlerts };
