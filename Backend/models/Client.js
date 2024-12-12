const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ClientSchema = new mongoose.Schema({
    cedula: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Encriptar la contraseña antes de guardarla
ClientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Client', ClientSchema);
