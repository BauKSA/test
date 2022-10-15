const { Router } = require('express');

const getTest = require('./getTest');
const get_facilities = require('./get_facilities');
const get_priority = require('./get_priority');
const get_job_spot = require('./get_job_spot');
const hiring_posibilities = require('./hiring_posibilities');
const facilities = require('./facilities');

const router = Router();

router.use('/gettest', getTest);
router.use('/get_facilities', get_facilities);
router.use('/get_priority', get_priority);
router.use('/get_job_spot', get_job_spot);
router.use('/hiring_posibilities', hiring_posibilities);
router.use('/facilities_shifts', facilities);


module.exports = router;