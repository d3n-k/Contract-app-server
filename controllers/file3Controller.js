const ApiError = require('../error/ApiError');
const { File3 } = require('../models/models');
const path = require('path');


class File3Controller {
    async create(req, res, next) {
        try {
            const {file} = req.files;
            let fileName = 'contract3' + ".odt";
            file.mv(path.resolve(__dirname, '..', 'files3', fileName));
            const fileB = await File3.create({file: fileName});
            return res.json(fileB);
           
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const files = await File3.findAll();
        return res.json(files);
    }

    async delete(req, res) {
        try {
          const { id } = req.params;
          if (!id) {
            res.status(400).json({ message: "Id не указан" });
          }
          const file3 = await File3.destroy({
            where: { id: id },
          });
          return res.json(file3);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
   
}

module.exports = new File3Controller();