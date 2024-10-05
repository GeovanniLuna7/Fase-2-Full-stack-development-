const express = require('express');
const { createAlert, getAlerts } = require('./alertsController');
const router = express.Router();

// Ruta para crear una nueva alerta
router.post('/create', createAlert);

// Ruta para obtener todas las alertas
router.get('/list', getAlerts);

module.exports = router;
