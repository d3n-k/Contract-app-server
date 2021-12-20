const { Cathedra } = require("../models/models");
const ApiError = require('../error/ApiError');


class CathedraController {
    async create(req, res, next) {
        try {
            const {name, zav_name, address, telephone, adminId} = req.body;
            const cathedra = await Cathedra.create({name, zav_name, address, telephone, adminId});
            return res.json(cathedra);

        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const cathedras = await Cathedra.findAll();
        return res.json(cathedras);
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"});
            }
            const cathedra = await Cathedra.destroy({
                where: { id: id }
              });
            return res.json(cathedra);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const cathedra = req.body;
            if (!cathedra.id) {
                res.status(400).json( {message: 'Id не указан'});
            }
            const updatedPost = await Cathedra.update(cathedra, {
                where: {id: id},
            })
            
            return res.json(updatedPost);
        } catch(e) {
            
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
        const {id} = req.params;
        const cathedra = await Cathedra.findOne({
            where: {id}
        })
        return res.json(cathedra);
     }
}

module.exports = new CathedraController();