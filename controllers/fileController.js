const ApiError = require('../error/ApiError');
const { File } = require('../models/models');
const path = require('path');


class FileController {
    async create(req, res, next) {
        try {
            const {file} = req.files;
            let fileName = 'contract' + ".odt";
            file.mv(path.resolve(__dirname, '..', 'files', fileName));
            const fileB = await File.create({file: fileName});
            return res.json(fileB);
           
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const files = await File.findAll();
        return res.json(files);
    }

    async delete(req, res) {
        try {
          const { id } = req.params;
          if (!id) {
            res.status(400).json({ message: "Id не указан" });
          }
          const file = await File.destroy({
            where: { id: id },
          });
          return res.json(file);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
}

module.exports = new FileController();