const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Trip = require('./models/Trip');



const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

app.use(cors({
    origin: '*', // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    credentials: false, // Deshabilitar encabezados de autenticación
}));

// Manejar solicitudes preflight (OPTIONS)
app.options('*', cors());

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
