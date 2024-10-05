const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/envios', { useNewUrlParser: true, useUnifiedTopology: true });

const envioSchema = new mongoose.Schema({
  remitente: String,
  destinatario: String,
  mercancia: String,
  // Otros campos
});

const Envio = mongoose.model('Envio', envioSchema);
