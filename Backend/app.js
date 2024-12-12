const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:3000', 'https://fronted-software.onrender.com'], // Agrega tus dominios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permitir cookies y encabezados personalizados
}));

// Configuración de encabezados adicionales para CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Configuración de rutas REST
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trips', tripRoutes);

// Conexión a MongoDB
mongoose.connect(
    'mongodb+srv://sergiomesa01:nOwlqJoGuKxjgEF2@training.m1grr.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Ruta raíz para pruebas
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Manejar solicitudes preflight (OPTIONS)
app.options('*', cors());

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
