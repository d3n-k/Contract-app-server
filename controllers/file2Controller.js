const ApiError = require('../error/ApiError');
const { File2 } = require('../models/models');
const path = require('path');


class File2Controller {
    async create(req, res, next) {
        try {
            const {file} = req.files;
            let fileName = 'contract2' + ".odt";
            file.mv(path.resolve(__dirname, '..', 'files2', fileName));
            const fileB = await File2.create({file: fileName});
            return res.json(fileB);
           
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const files = await File2.findAll();
        return res.json(files);
    }

    async delete(req, res) {
        try {
          const { id } = req.params;
          if (!id) {
            res.status(400).json({ message: "Id не указан" });
          }
          const file2 = await File2.destroy({
            where: { id: id },
          });
          return res.json(file2);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }

   
}

module.exports = new File2Controller();