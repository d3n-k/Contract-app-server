const { Contract } = require("../models/models");
const ApiError = require('../error/ApiError');

class ContractController {
    async create(req, res, next) {
        try {
            const {fullname, courseId} = req.body;
            const contract = await Contract.create({fullname, courseId});
            return res.json(contract);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) {
      try {
        const {courseId} = req.body;
        const contracts = await Contract.findAll({
            where: { courseId: courseId }
          });
        return res.json(contracts);
      } catch(e) {
        next(ApiError.badRequest(e.message));
    }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"});
            }
            const contract = await Contract.destroy({
                where: { id: id }
              });
            return res.json(contract);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const contract = req.body;
            if (!contract.id) {
                res.status(400).json( {message: 'Id не указан'});
            }
            const updatedCont = await Contract.update(contract, {
                where: {id: id},
            })
            
            return res.json(updatedCont);
        } catch(e) {
            
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
       const {id} = req.params;
       const contract = await Contract.findOne({
           where: {id}
       })
       return res.json(contract);
    }

    async deleteAll(req, res, next) {
        try {
            const {courseId} = req.params;
            if (!courseId) {
                res.status(400).json({message: "courseId не указан"});
            }
            const contract = await Contract.destroy({
                where: { courseId: courseId }
              });
            return res.json(contract);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ContractController();