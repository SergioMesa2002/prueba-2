const express = require('express');
const router = express.Router();
const Trip = require('../models/trip'); // Importa el modelo Trip

// Ruta para obtener todos los viajes o filtrar por origen, destino y fecha
router.get('/', async (req, res) => {
    const { origin, destination, date } = req.query;
    const query = {};

    if (origin) query.origin = { $regex: new RegExp(origin, 'i') }; // Búsqueda insensible a mayúsculas
    if (destination) query.destination = { $regex: new RegExp(destination, 'i') }; // Búsqueda insensible a mayúsculas
    if (date) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        query.departureTime = { $gte: startOfDay, $lte: endOfDay };
    }

    try {
        const trips = await Trip.find(query)
            .populate('bus', 'licensePlate capacity') // Campos del modelo Bus
            .populate('driver', 'name licenseNumber'); // Campos del modelo Driver
        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los viajes', error });
    }
});

// Ruta para reservar asientos
router.post('/:id/reserve', async (req, res) => {
    const { id } = req.params;
    const { seats } = req.body;

    try {
        const trip = await Trip.findById(id);
        if (!trip) {
            return res.status(404).json({ message: 'Viaje no encontrado' });
        }

        // Ejemplo: Manejo de la reserva de asientos (ajusta según tus necesidades)
        const reservedSeats = seats || [];
        const totalSeats = 20; // Suponiendo 20 asientos por viaje

        // Verificar si los asientos solicitados están disponibles
        const unavailableSeats = reservedSeats.filter(seat => seat < 1 || seat > totalSeats);
        if (unavailableSeats.length > 0) {
            return res.status(400).json({
                message: 'Algunos asientos no son válidos',
                invalidSeats: unavailableSeats,
            });
        }

        // Simula el guardado de la reserva (aquí puedes agregar lógica para marcar los asientos como ocupados)
        // Ejemplo: Puedes añadir un array `reservedSeats` al modelo `Trip` y actualizarlo aquí
        console.log(`Asientos reservados para el viaje ${id}:`, reservedSeats);

        res.status(200).json({
            message: 'Reserva realizada con éxito',
            tripId: id,
            reservedSeats,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la reserva', error });
    }
});

module.exports = router;
