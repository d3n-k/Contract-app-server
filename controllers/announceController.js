const { Announ } = require("../models/models");
const ApiError = require('../error/ApiError');


class AnnounceController {

    async create(req, res, next) {
        try {
            const {name} = req.body;
            const announ = await Announ.create({name});
            return res.json(announ);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const announ = await Announ.findAll();
        return res.json(announ);
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const announ = req.body;
            if (!announ.id) {
                res.status(400).json( {message: 'Id не указан'});
            }
            const updatedPost = await Announ.update(announ, {
                where: {id: id},
            })
            
            return res.json(updatedPost);
        } catch(e) {
            
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new AnnounceController();