const { Course } = require("../models/models");

class AllCourseController {
    

    async getAllWithoutLimit(req, res) {
        const courses = await Course.findAll();
        return res.json(courses);
    }

}

module.exports = new AllCourseController();