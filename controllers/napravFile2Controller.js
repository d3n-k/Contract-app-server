const ApiError = require('../error/ApiError');
const { NapravFile2 } = require('../models/models');
const path = require('path');


class NapravFile2Controller {
    async create(req, res, next) {
        try {
            const {file} = req.files;
            let fileName = 'data' + ".docx";
            file.mv(path.resolve(__dirname, '..', fileName));
            const fileB = await NapravFile2.create({file: fileName});
            return res.json(fileB);
           
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const files = await NapravFile2.findAll();
        return res.json(files);
    }

    async delete(req, res) {
        try {
          const { id } = req.params;
          if (!id) {
            res.status(400).json({ message: "Id не указан" });
          }
          const file = await NapravFile2.destroy({
            where: { id: id },
          });
          return res.json(file);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
}

module.exports = new NapravFile2Controller();