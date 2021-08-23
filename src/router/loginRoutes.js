const express = require('express')
const router = express.Router()
const connect = require('../../config/conexion')
const util = require('util')
const { json } = require('express')
const query = util.promisify(connect.query).bind(connect)

//const userRouter = require('../router/')


// metodo post par ainiciar sesion se hacenlas respectivas validadciones
// para saber si ya esta logueado
router.post('/iniciar_sesion', async(req, res) => {
    const { user, pass } = req.body;
    if (user && pass) {
        try {
            const rows = await query(`SELECT * FROM users.user WHERE user = '${user}' AND pass = '${pass}'`)
            console.log(rows);
            if (rows.length > 0) {
                try {
                    await query(`UPDATE  users.user SET login = 1 WHERE id=${rows[0].id}`)
                    res.json({
                        login: true,
                        message: "inicio de sesion correcta"
                    })
                } catch (error) {
                    res.json({
                        login: false,
                        message: "Error",
                        error
                    })
                }
            } else {
                res.json({
                    login: false,
                    message: "acceso denegado"
                })
            }
        } catch (error) {
            res.json({
                message: "no se pudo completar el proceso revisa bien tu imformacion",
                error
            })
        }
    } else {
        res.status(400).json({
            login: false,
            message: "asegurate de enviar user and pass"
        })
    }
})

// metodo post para cerrar sesion se valida por el id par desloguer solo un registro
router.post('/cerrar_sesion/:id', async(req, res) => {
    const { id } = req.params
    try {
        await query(`UPDATE users.user SET login = 0 WHERE id=${id}`)
        res.json({
            message: 'Sesion cerrada satisfactoriamente'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error: error.sqlMessage
        })
    }
})

module.exports = router
