const express = require("express");
const router = express.Router();
const {
  getuser,
  getselecteduser,
  updateuser,
  deleteUser
} = require("../Controllers/user.controller");
const getCloudinaryUploader = require("../middlewares/cloudinary.multer");
const uploadProfilePhoto = getCloudinaryUploader("profile_photos");

const checkauth = require("../middlewares/auth.middleware");



router.get("/", checkauth, getuser);
router.get("/:id", checkauth, getselecteduser);
router.put("/", checkauth, uploadProfilePhoto.single("profilephoto"), updateuser);
router.delete("/", checkauth, deleteUser); 

module.exports = router;
