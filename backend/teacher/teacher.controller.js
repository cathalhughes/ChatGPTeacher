const service = require('./teacher.service');

const generateLesson = async function (req, res, next) {
    const result = await service.generateLesson({ ...req.body });
    return res.send(result);
};

module.exports = {
    generateLesson,
};
