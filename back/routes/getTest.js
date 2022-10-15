const { Router } = require('express');
const { QueryTypes } = require('sequelize');
const { conn } = require('../db')

const router = Router();

router.get('/', async(req, res, next)=>{
    try {
        const facilities = await conn.query(`SELECT * FROM "facilities"`, { type: QueryTypes.SELECT });
        return res.send(facilities)
    } catch (error) {
        next(error);
    }
})

module.exports = router;