const  express = require('express');
const router =  express.Router();
const {getallcars,postcarrental,deletecarrental}= require("../Controllers/carrental.controller");
const getCloudinaryUploader = require("../middlewares/cloudinary.multer");
const uploadCarPhoto = getCloudinaryUploader("car_rental");




router.get('/',getallcars);
router.post("/", uploadCarPhoto.single("Choosefile"), postcarrental); 


router.delete('/:id',deletecarrental);

module.exports = router;