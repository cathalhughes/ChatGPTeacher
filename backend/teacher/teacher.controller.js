const service = require('./teacher.service');

const generateLesson = async function (req, res, next) {
    const message = req.body.message;
    const result = await service.generateLesson({ message });
    return res.send(result);
};

module.exports = {
    generateLesson,
};
