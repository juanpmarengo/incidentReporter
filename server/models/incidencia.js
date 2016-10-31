var mongoose = require('mongoose');

module.exports = mongoose.model('Incidencia', {
    laboratorio: String,
    maquina: String,
    falla: {
        fecha: { type: Date, default: Date.now },
        sistemaOperativo: {
            nombre: String,
            virtual: { type: Boolean, default: false },
            comentario: String
        },
        codigo: String,
        descripcion: String,
        estado: String,
        condiciones: String,
        capturas: [{
            imagen: String,
            imagenContentType: String
        }],
        solucion: {
            fecha: Date,
            descripcion: String
        }
    }
});