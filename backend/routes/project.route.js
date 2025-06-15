const express = require('express')
const router = express.Router();
const {getallprojects,postproject,deleteProject}= require('../Controllers/projects.controller');
const checkauth = require("../middlewares/auth.middleware")

router.get('/',checkauth ,getallprojects)
router.post('/',checkauth,postproject);
router.delete('/:id',checkauth,deleteProject);

module.exports = router;