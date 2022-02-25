const ApiError = require('../error/ApiError');
const { DocFile4 } = require('../models/models');
const path = require('path');


class DocFile4Controller {
    async create(req, res, next) {
        try {
            const {file} = req.files;
            let fileName = 'dogovor4' + ".docx";
            file.mv(path.resolve(__dirname, '..', fileName));
            const fileB = await DocFile4.create({file: fileName});
            return res.json(fileB);
           
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const files = await DocFile4.findAll();
        return res.json(files);
    }

    async delete(req, res) {
        try {
          const { id } = req.params;
          if (!id) {
            res.status(400).json({ message: "Id не указан" });
          }
          const file = await DocFile4.destroy({
            where: { id: id },
          });
          return res.json(file);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
}

module.exports = new DocFile4Controller();