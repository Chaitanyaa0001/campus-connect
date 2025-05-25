const express = require('express');
const router = express.Router();

const { getAllCarpools,postcarpool,deletecarpool } = require('../Controllers/carpool.controller.js');

router.get('/', getAllCarpools);
router.post('/', postcarpool);
router.delete('/:id', deletecarpool);

module.exports = router;