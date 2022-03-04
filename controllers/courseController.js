const { Course } = require("../models/models");
const ApiError = require('../error/ApiError');

class CourseController {
    async create(req, res, next) {
        try {
            const {name, number, price, date, adminId} = req.body;
            const course = await Course.create({name, number, price, date, adminId});
            return res.json(course);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res) {
        let {limit, page} = req.query;
        page = page || 1;
        limit = limit || 20;
        let offset = page * limit - limit;
        const courses = await Course.findAndCountAll({limit, offset, 
            order: [
                ['number']
            ]
        });
        return res.json(courses);
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"});
            }
            const course = await Course.destroy({
                where: { id: id }
              });
            return res.json(course);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const course = req.body;
            if (!course.id) {
                res.status(400).json( {message: 'Id не указан'});
            }
            const updatedPost = await Course.update(course, {
                where: {id: id},
            })
            
            return res.json(updatedPost);
        } catch(e) {
            
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
       const {id} = req.params;
       const course = await Course.findOne({
           where: {id}
       })
       return res.json(course);
    }
}

module.exports = new CourseController();