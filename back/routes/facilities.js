const { Router } = require('express');
const { conn } = require('../db.js')
const { QueryTypes } = require('sequelize');

const router = Router();

router.get('/', async(req, res, next)=>{
    try {
        let jobs = await conn.query(`SELECT * FROM "jobs"`, { type: QueryTypes.SELECT });
        let nurses = await conn.query(`SELECT * FROM "nurses"`, { type: QueryTypes.SELECT });
        let hired = await conn.query(`SELECT * FROM "nurse_hired_jobs"`, { type: QueryTypes.SELECT });
        let facilities = await conn.query(`SELECT * FROM "facilities"`, { type: QueryTypes.SELECT });
        
        for(let i = 0; i < hired.length; i++){
            for(let j = 0; j < jobs.length; j++){
                if(hired[i].job_id == jobs[j].job_id){
                    hired[i].facility_id = jobs[j].facility_id
                }
            }
        }

        for(let i = 0; i < facilities.length; i++){
            facilities[i].nurses = []
            for(let j = 0; j < hired.length; j++){
                if(facilities[i].facility_id === hired[j].facility_id){
                    let changes = false;
                    for(let y = 0; y < facilities[i].nurses.length; y++){
                        if(facilities[i].nurses[y].nurse_id === hired[j].nurse_id){
                            facilities[i].nurses[y].jobs++;
                            changes = true;
                        }
                    }
                    if(!changes){
                        facilities[i].nurses.push({
                            nurse_id: hired[j].nurse_id,
                            jobs: 1
                        })
                    }
                }
            }
        }

        for(let i = 0; i < facilities.length; i++){
            facilities[i].nurses.sort((a, b)=>{
                return b.jobs - a.jobs;
            })
        }

        let employees = []

        for(let i = 0; i < facilities.length; i++){
            let employee = {
                nurse_id: facilities[i].nurses[0].nurse_id,
                facility_id: facilities[i].facility_id,
                facility_name: facilities[i].facility_name
            }

            for(let j = 0; j < nurses.length; j++){
                if(nurses[j].nurse_id === employee.nurse_id){
                    employee.nurse_name = nurses[j].nurse_name
                    employee.nurse_type = nurses[j].nurse_type
                }
            }

            employees.push(employee)

        }

        employees.sort((a, b)=>{
            return a.facility_id - b.facility_id
        })
        
        return res.send(employees)

    } catch (error) {
        next(error);
    }
})

module.exports = router;