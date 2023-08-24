const { Announ } = require("../models/models");
const ApiError = require('../error/ApiError');


class AnnounceController {

    async create(req, res, next) {
        try {
            const { name } = req.body;
            const announ = await Announ.create({ name });
            return res.json(announ);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const announ = await Announ.findAll();
        return res.json(announ);
    }

    async update(req, res, next) {
        try {
            const announ = req.body;
            let announs = await Announ.findAll();
            if (announs.length > 0) {
                const firstId = announs[0].id;
                const updatedPost = await Announ.update(announ, {
                    where: { id: firstId },
                })
                return res.json(updatedPost);
            }
        } catch (e) {
            console.log("error announce");
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new AnnounceController();