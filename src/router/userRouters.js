const express = require('express')
const router = express.Router()
const connect = require('../../config/conexion')
const util = require('util')
const { json } = require('express')
const query = util.promisify(connect.query).bind(connect)

//const userRouter = require('../router/')

router.get('/', async(req, res) => {
    try {
        const users = await query('SELECT * FROM users.user')
        res.json({
            ok: true,
            message: 'consulta satisfatoria',
            users
        })
    } catch (error) {
        res.json({
            ok: false,
            message: 'No entiendo lo que quieres hacer'
        })
    }
})

router.post('/', async(req, res) => {
    const { nombre, apellido, user, pass } = req.body
    try {
        await query(`INSERT INTO users.user (nombre, apellido, user, pass)
                    VALUES ('${nombre}', '${apellido}', '${user}', '${pass}')`)
        res.json({
            ok: true,
            message: 'registro insertado satisfactoriamente'
        })
    } catch (error) {
        res.json({
            ok: false,
            message: 'error al insertar el registro'
        })
    }
})

router.put('/:id', async(req, res) => {
    const { id } = req.params
    const { nuevoNombre } = req.body
    if (id > 0) {
        try {} catch (error) {
            res.json({
                ok: false,
                error
            })
        }
        await query(`UPDATE users.user 
                    SET nombre= '${nuevoNombre}', apellido= '${nuevoApeliido}'
                    WHERE id='${id}'`)
        res.json({
            ok: true,
            message: `Se actualizo con exito el registro #${id}`
        })
    } else {
        res.json({
            ok: false,
            message: 'faltan datos'
        })
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params
        // console.log(`DELETE FROM users.user
        // WHERE id = '${id}'`);
    try {
        await query(`DELETE FROM users.user
                     WHERE id = '${id}'`)

        res.json({
            ok: true,
            menssage: 'eliminado'
        })
    } catch (error) {
        res.json({
            ok: false,
            error
        })
    }
})

module.exports = router