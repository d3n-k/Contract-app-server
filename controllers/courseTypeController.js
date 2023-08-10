const { CourseType } = require("../models/models");
const ApiError = require('../error/ApiError');

class CourseTypeController {
    async getAll(req, res) {
        const types = await CourseType.findAll();
        return res.json(types);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const type = await CourseType.findOne({
            where: { id }
        })
        return res.json(type);
    }
}

module.exports = new CourseTypeController();