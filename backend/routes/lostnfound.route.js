const express = require('express');
const router = express.Router(); 

const { getalllostnfound, postlostnfound, DeleteLostnfound } = require("../Controllers/lostnfound.controller");
const getCloudinaryUploader = require("../middlewares/cloudinary.multer");
const upload = getCloudinaryUploader("lost_and_found");


router.get('/', getalllostnfound);
router.post("/",  upload.single("choosefile"), postlostnfound);
router.delete('/:id', DeleteLostnfound);

module.exports = router;
