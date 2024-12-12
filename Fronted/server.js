const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Proxy para redirigir solicitudes

const app = express();
const PORT = 3000; // Cambia el puerto si es necesario
const BACKEND_URL = 'https://prueba-2-cwhb.onrender.com'; // Cambia esto a la URL correcta de tu backend desplegado

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Asegúrate de que los archivos estáticos están en la carpeta 'public'

// Redirigir solicitudes de API al backend
app.use('/api', createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // Elimina el prefijo '/api' si no está en el backend
}));

// Manejo de rutas para index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Asegúrate de que 'index.html' esté en la carpeta 'public'
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor frontend corriendo en http://localhost:${PORT}`);
});
