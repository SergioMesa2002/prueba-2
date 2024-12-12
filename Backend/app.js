const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importa las rutas existentes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const tripRoutes = require('./routes/tripRoutes'); // Importa las rutas de viajes

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'https://fronted-software.onrender.com'], // Cambia esto según tu frontend desplegado
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    credentials: true, // Permitir cookies o encabezados de autenticación
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Manejo explícito de solicitudes preflight

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

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
});

// Puerto de la aplicación
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
