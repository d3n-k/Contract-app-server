const {Customer} = require('../models/models');
const ApiError = require('../error/ApiError');

class CustomerController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const customer = await Customer.create({name});
            return res.json(customer);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res) {
        const customers = await Customer.findAll();
        return res.json(customers);
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: "Id не указан"});
            }
            const customer = await Customer.destroy({
                where: { id: id }
              });
            return res.json(customer);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const customer = req.body;
            if (!customer.id) {
                res.status(400).json( {message: 'Id не указан'});
            }
            const updatedPost = await Customer.update(customer, {
                where: {id: id},
            })
            
            return res.json(updatedPost);
        } catch(e) {
            
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
        const {id} = req.params;
        const customer = await Customer.findOne({
            where: {id}
        })
        return res.json(customer);
     }
}

module.exports = new CustomerController();