const express = require('express');
const router = express.Router();
const studentSchema = require('../model/studentList');
const data = require("../students.json")

router.get('/preload', async function (req, res) {
    const findDetail = await studentSchema.findOne({})
    if (findDetail === undefined || findDetail === null) {
        for (let i = 0; i <= data.length; i++) {
            await studentSchema.create(data[i]);
        }
        return res.status(200).json({ "status": "Data Preload successfuly " })
    } else {
        return res.status(200).json({ "status": "Data Allready loaded " })
    }
});

router.get('/get-studentList', async function (req, res) {
    try {
        let skip = parseInt(req.query.skip) || 0; //  use req.query for GET requests
        const limit = 10;
        const findDetail = await studentSchema.find({}, null, { skip, limit }).exec();
        if (findDetail) {
            const successRes = {
                status: 1,
                message: 'Successfully get studentlist details',
                data: findDetail,
            };

            return res.status(200).json(successRes);
        } else {
            const errRes = {
                status: 0,
                message: 'Cannot find studentlist',
            };
            return res.status(404).json(errRes);
        }
    } catch (error) {
        console.error('Error fetching student list:', error);
        const errRes = {
            status: 0,
            message: 'Internal server error',
        };

        return res.status(500).json(errRes);
    }
});

module.exports = router;