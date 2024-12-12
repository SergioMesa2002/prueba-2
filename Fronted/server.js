const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Proxy para redirigir solicitudes

const app = express();
const PORT = 3000; // Cambia el puerto si es necesario
const BACKEND_URL = 'https://prueba-2-backend.vercel.app'; // Cambia esto a la URL del backend desplegado

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Redirigir solicitudes de API al backend
app.use('/api', createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
}));

// Manejo de rutas para index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor frontend corriendo en http://localhost:${PORT}`);
});
