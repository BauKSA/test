const { Router } = require('express');
const { conn } = require('../db.js')
const { QueryTypes } = require('sequelize');

const router = Router();

router.get('/:id', async(req, res, next)=>{
    const id = req.params.id

    try {
        const facilities = await conn.query(`SELECT * FROM "facilities"`, { type: QueryTypes.SELECT });
        const clinician_work_history = await conn.query(`SELECT * FROM "clinician_work_history"`, { type: QueryTypes.SELECT });

        let facility_id = null;
        for(let i = 0; i < facilities.length; i++){
            if(parseInt(facilities[i].facility_id) === parseInt(id)){
                facility_id = facilities[i].facility_id;
            }
        }

        if(!facility_id){
            return res.send(false)
        }else{

            let nurses_id = [];
            let rest = 0;

            for(let i = 0; i < clinician_work_history.length; i++){
                if(clinician_work_history[i].facility_id === facility_id){
                    let points = 0;
                    if(clinician_work_history[i].worked_shift){
                        points += 1;
                    }
                    if(clinician_work_history[i].call_out){
                        points -= 3;
                    }

                    const nurse = {
                        nurse_id: clinician_work_history[i].nurse_id,
                        points: points,
                        facility_id: clinician_work_history[i].facility_id
                    }

                    let exist = false;

                    for(let j = 0; j < nurses_id.length; j++){
                        if(nurses_id[j].nurse_id === clinician_work_history[i].nurse_id){
                            nurses_id[j].points += points;
                            exist = true;
                        }
                    }

                    if(!exist){
                        nurses_id.push(nurse)
                    }
                }

                if(clinician_work_history[i].no_call_no_show){
                    rest++;
                }
                
            }

            if(rest > 0){
                for(let j = 0; j < nurses_id.length; j++){
                    nurses_id[j].points -= (rest * 5);
                }
            }

            nurses_id.sort((a, b)=>{
                return b.points - a.points;
            })

            nurses_id.sort((a, b)=>{
                if(a.points === b.points){
                    return a.nurse_id - b.nurse_id;
                }
            })

            return res.send(nurses_id)
        }

    } catch (error) {
        next(error);
    }
})

module.exports = router;