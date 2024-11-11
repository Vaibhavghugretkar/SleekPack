const multer= require('multer');
const { route } = require('../routes');

const storage = multer.memoryStorage();

const upload = multer({storage:storage});

module.exports = upload;