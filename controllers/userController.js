const ApiError = require("../error/ApiError");
const ActiveDirectory = require("activedirectory");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const config = {
  url: process.env.USERS_BASE_URL,
  baseDN: process.env.USERS_BASE_DN,
  username: process.env.DEFAULT_USERNAME,
  password: process.env.DEFAULT_PASSWORD,
};

async function createAdm(login, role, res) {
  const candidate = await User.findOne({ where: { login } });
     if (candidate) {
      console.log("Authenticated!");
      const token = generateJwt(candidate.id, candidate.login, candidate.role);
      return res.json({ token });
     } else {
      console.log("Authenticated!");
      const user = await User.create({ login, role });
      const token = generateJwt(user.id, user.login, user.role);
      return res.json({ token });
     }
 
}

const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  })
}

class UserController {
  async registration(req, res, next) {
    console.log(req.body);
    const { login, password, role } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest("Некорректный логин или пароль!"));
    }
    const ad = new ActiveDirectory(config);
    ad.authenticate(login, password, function (err, auth) {
      if (err) {
        console.log("ERROR: " + JSON.stringify(err));
        return next(ApiError.badRequest("Ошибка! Неправильный пароль..."));
      }
      if (auth) {
        createAdm(login, role, res);
      } else {
        console.log("Authentication failed!");
        return next(ApiError.badRequest("Непредвиденная ошибка..."));
      }
    });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.login, req.user.role);
    return res.json({token});
  }

  async delete(req, res) {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({message: "Id не указан"});
        }
        const user = await User.destroy({
            where: { id: id }
          });
        return res.json(user);
    } catch(e) {
        next(ApiError.badRequest(e.message));
    }
}

async getAll(req, res) {
  const users = await User.findAll();
  return res.json(users);
}
}

module.exports = new UserController();
