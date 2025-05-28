const express = require('express')
const router = express.Router();
const {getallprojects,postproject,deleteProject}= require('../Controllers/projects.controller')

router.get('/', getallprojects)
router.post('/',postproject);
router.delete('/:id',deleteProject);

module.exports = router;