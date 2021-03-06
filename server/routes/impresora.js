const express = require('express');
const Impresora = require('../models/impresora');
const app = express();
const _ = require('underscore')


//BUSCA LA IMPRESORA POR SU ID 
app.get('/', (req, res) => {
    res.json({
        nombre: "Erick Tapia",
        materia: "PLATAFORMAS WEB",
        carrera: "INGENIERÍA EN CIENCIAS DE LA COMPUTACIÓN",
        profesor: "Rodrigo Tufiño",
        actividad: "Prueba sobre RestServer-GrupoTech",
        github: "https://github.com/Bolo10/Tech-RestServer",
        heroku: "https://grupotech-tapiaerick.herokuapp.com/",
        // help: "Para acceder a los metodos get, post, put y delete colocar el enlace de heroku en postman get-> /impresora consulta todas las impresoras get -> /impresora/id busca impresora especifica post -> impresora/id agrega impresora a base put -> impresora/id actualiza datos de impresora en base delete -> impresora/id elimina de base",
        ejemplo: "https://grupotech-tapiaerick.herokuapp.com/impresora"

    });
});
app.get('/impresora/:id', (req, res) => {
    let id = req.params.id;
    Impresora.findById(id, (err, impresoras) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (impresoras === null) {
            msg = "No existe la impresora con ese ID"
            res.json({
                ok: true,
                msg

            })
        } else {
            res.json({
                ok: true,
                impresoras

            })
        }




    })
});
// INGRESA A LA BASE DE DATOS
app.post('/impresora', (req, res) => {

    let body = req.body

    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        contador: body.contador,
        precio: body.precio

    });
    if (req.body.color == "True" || "true" || "Verdadero" || "verdadero" || "1") {
        impresora.color = true;
    } else if (req.body.color === "False" || "false" || "Falso" || "falso" || "0") {
        impresora.color = false;
    }
    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({ ok: false, err });
        }

        res.json({ ok: true, impresora: impresoraDB })
    });

});
// MODIFICA EN LA BASE DE DATOS
app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;


    let body = _.pick(req.body, ['modelo', 'color', 'ip', 'precio']); //filtrado de datos usando libreria underscore

    if (req.body.color == "True" || "true" || "Verdadero" || "verdadero" || "1") {
        body.color = true;
    } else if (req.body.color === "False" || "false" || "Falso" || "falso" || "0") {
        body.color = false;
    }

    Impresora.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        nid = id;
        Impresora.findById(nid, (err2, obtenida) => {
            if (err2) {
                return res.status(400).json({ ok: false, err2 });
            }
            res.json({ ok: true, impresora: obtenida })
        })
    });
});
// ELIMINA POR ID 
app.delete('/impresora/:id', (req, res) => {
    let id = req.params.id;
    //Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
    let cambiarEstado = {
        estado: true
    }
    Impresora.findOneAndRemove(id, (err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!impresoraDB) {
            res.json({
                ok: false,
                err: {
                    message: "impresora no encontrada"
                }
            })
        } else {
            res.json({
                ok: true,
                impresora: impresoraDB
            })
        }
    })
});
//CONSULTA TODAS LAS IMPRESORAS
app.get('/impresora', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde)
    let limite = req.query.limite || 5;
    limite = Number(limite)
    Impresora.find().skip(desde).limit(limite) //filtro de busqueda
        .exec((err, impresoras) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Impresora.count({}, (err, cont) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })

                }
                if (cont === 0) {
                    msg = "No existen impresoras"
                    res.json({
                        ok: true,
                        msg


                    })

                } else(
                    res.json({
                        ok: true,
                        impresoras


                    }))

            });

        })
});
module.exports = app