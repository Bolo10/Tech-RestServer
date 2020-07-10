const mongoose = require('mongoose');


let uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let impresoraSchema = new Schema({
    marca: {
        type: String,
        required: [true, "La marca es requerida"]
    },
    modelo: {
        type: String,
        required: [true, "El modelo es requerido"]
    },
    serie: {
        type: Number,
        required: [true, "El numero de serie es requerido"],
        unique: true
    },
    color: {
        type: Boolean,
        required: false,
        default: false
    },
    ip: {
        type: String,
        required: [true, "La ip es requerida"]
    },
    contador: {
        type: Number,
        required: false,
        default: 0
    },
    precio: {
        type: Number,
        required: [true, "El precio es requerido"]
    }

});

impresoraSchema.plugin(uniqueValidator, { message: `{PATH} debe ser unico` })
impresoraSchema.methods.toJSON = function() {
    let impresora = this;
    let impresoraObject = impresora.toObject();
    delete impresoraObject.contador;
    return impresoraObject
}

module.exports = mongoose.model('impresora', impresoraSchema)