const ApiError = require("../error/ApiError");
const { Admin } = require("../models/models");
const ActiveDirectory = require("activedirectory");
const config = {
  url: "ldap://172.20.0.71",
  baseDN: "OU=Users,OU=University,dc=bsmu,dc=by",
  username: "webapps@bsmu.by",
  password: "!QAZ2wsx",
};

async function admi(login, secret, res) {
    const admin = await Admin.create({ login, secret});
    return res.json(admin);
}

class AdminController {
  async create(req, res, next) {
    try {
      const { login, secret } = req.body;

      const candidate = await Admin.findOne({ where: { login } });
     if (candidate) {
      return next(ApiError.badRequest("Пользователь с таким логином уже существует"));
    }

      const sAMAccountName = login;

      const ad = new ActiveDirectory(config);
      ad.findUser(sAMAccountName, function (err, user) {
        if (err) {
          console.log("ERROR: " + JSON.stringify(err));
          return next(ApiError.badRequest("Ошибка!"));
        }

        if (!user) {
          console.log("User: " + sAMAccountName + " not found.");
          return next(ApiError.badRequest("User: " + sAMAccountName + " not found."));
        } 
        else {
            console.log(JSON.stringify(user.cn));
            const sec = user.cn;
            admi(login, sec, res);
        }
      });

    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const admins = await Admin.findAll();
    return res.json(admins);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Id не указан" });
      }
      const admin = await Admin.destroy({
        where: { id: id },
      });
      return res.json(admin);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new AdminController();
