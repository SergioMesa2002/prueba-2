const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importa las rutas existentes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const tripRoutes = require('./routes/tripRoutes'); // Importa las rutas de viajes

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', ], // Cambia la URL por la de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir cookies o encabezados de autenticación
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Manejo de preflight


// Configuración para procesar JSON y datos de formularios
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de rutas REST
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trips', tripRoutes); // Agrega las rutas de viajes

// Configuración de Mongoose
mongoose.set('strictQuery', true);
const URI = 'mongodb+srv://sergiomesa01:nOwlqJoGuKxjgEF2@training.m1grr.mongodb.net/?retryWrites=true&w=majority&appName=training';

// Conexión a MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Ruta raíz para pruebas
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Puerto de la aplicación
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
