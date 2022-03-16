const ApiError = require('../error/ApiError');
const { NapravFile1 } = require('../models/models');
const path = require('path');


class NapravFile1Controller {
    async create(req, res, next) {
        try {
            const {file} = req.files;
            let fileName = 'res1' + ".docx";
            file.mv(path.resolve(__dirname, '..', fileName));
            const fileB = await NapravFile1.create({file: fileName});
            return res.json(fileB);
           
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const files = await NapravFile1.findAll();
        return res.json(files);
    }

    async delete(req, res) {
        try {
          const { id } = req.params;
          if (!id) {
            res.status(400).json({ message: "Id не указан" });
          }
          const file = await NapravFile1.destroy({
            where: { id: id },
          });
          return res.json(file);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
}

module.exports = new NapravFile1Controller();