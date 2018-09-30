const express = require('express');
const Usuario = require('../models/usuario');

const app = express();
const bcrypt = require('bcryptjs');
const _ = require('underscore');




// Obtiene información de la tabla Usuario
app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({})
            .skip(desde)
            .limit(limite)
            .exec((err,usuarios)=>{
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({},(err,conteo)=>{
                    res.json({
                        ok:true,
                        usuarios,
                        cuantos:conteo        
                    });
                }); 
            });

});

// Envia información a la BD-NOSQL de la tabla Usuario
app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


// Edita Información de la tabla NOSQL Usuario
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


app.delete('/usuario/:id', (req, res) => {

    let id =req.params.id;

    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err:{
                    message:'El usuario no existe'
                }
            });
        }

        res.json({
            ok:true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;