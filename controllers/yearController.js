const { Year } = require("../models/models");
const ApiError = require('../error/ApiError');


class YearController {

    async create(req, res, next) {
        try {
            const {name} = req.body;
            const year = await Year.create({name});
            return res.json(year);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const year = await Year.findAll();
        return res.json(year);
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const year = req.body;
            if (!year.id) {
                res.status(400).json( {message: 'Id не указан'});
            }
            const updatedYear = await Year.update(year, {
                where: {id: id},
            })
            
            return res.json(updatedYear);
        } catch(e) {
            
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new YearController();