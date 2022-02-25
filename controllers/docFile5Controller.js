const ApiError = require('../error/ApiError');
const { DocFile5 } = require('../models/models');
const path = require('path');


class DocFile5Controller {
    async create(req, res, next) {
        try {
            const {file} = req.files;
            let fileName = 'dogovor5' + ".docx";
            file.mv(path.resolve(__dirname, '..', fileName));
            const fileB = await DocFile5.create({file: fileName});
            return res.json(fileB);
           
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

        
    }

    async getAll(req, res) {
        const files = await DocFile5.findAll();
        return res.json(files);
    }

    async delete(req, res) {
        try {
          const { id } = req.params;
          if (!id) {
            res.status(400).json({ message: "Id не указан" });
          }
          const file = await DocFile5.destroy({
            where: { id: id },
          });
          return res.json(file);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
}

module.exports = new DocFile5Controller();