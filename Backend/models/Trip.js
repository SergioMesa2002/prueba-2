const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departureTime: {
        type: Date,
        required: true,
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId, // Solo este tipo es válido para referencias
        ref: 'Driver',
        required: true,
    },
});

// Usa `mongoose.models` para evitar errores de sobreescritura
const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

module.exports = Trip;
