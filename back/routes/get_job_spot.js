const { Router } = require('express');
const { conn } = require('../db.js')
const { QueryTypes } = require('sequelize');

const router = Router();

router.get('/', async(req, res, next)=>{
    try {
        let jobs = await conn.query(`SELECT * FROM "jobs"`, { type: QueryTypes.SELECT });
        const nurses = await conn.query(`SELECT * FROM "nurses"`, { type: QueryTypes.SELECT });
        let hired = await conn.query(`SELECT * FROM "nurse_hired_jobs"`, { type: QueryTypes.SELECT });
        
        for(let i = 0; i < hired.length; i++){
            for(let j = 0; j < nurses.length; j++){
                if(hired[i].nurse_id === nurses[j].nurse_id){
                    hired[i].nurse_type = nurses[j].nurse_type
                }
            }
        }

        for(let i = 0; i < jobs.length; i++){
            for(let j = 0; j < hired.length; j++){
                if(jobs[i].job_id === hired[j].job_id && jobs[i].nurse_type_needed === hired[j].nurse_type){
                    jobs[i].total_number_nurses_needed -= 1;
                }
            }
        }

        jobs.sort((a, b)=>{
            return a.job_id - b.job_id
        })

        return res.send(jobs);

    } catch (error) {
        next(error);
    }
})

module.exports = router;