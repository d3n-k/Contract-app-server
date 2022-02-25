const { Journal } = require("../models/models");
const ApiError = require('../error/ApiError');

class JournalController {
    async create(req, res, next) {
        try {
            const {organ, colvo, numbers, courseId} = req.body;
            const journal = await Journal.create({organ, colvo, numbers, courseId});
            return res.json(journal);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) {
      try {
        const {courseId} = req.body;
        const journals = await Journal.findAll({
            where: { courseId: courseId }
          });
        return res.json(journals);
      } catch(e) {
        next(ApiError.badRequest(e.message));
    }
    }


    async deleteAll(req, res, next) {
        try {
            const {courseId} = req.params;
            if (!courseId) {
                res.status(400).json({message: "courseId не указан"});
            }
            const journal = await Journal.destroy({
                where: { courseId: courseId }
              });
            return res.json(journal);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new JournalController();