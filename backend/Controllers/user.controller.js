const User = require("../models/user.model");
const bcrypt = require('bcryptjs')

const getuser = async (req, res) => {
    try {
        const userId = req.user; // comes from middleware
        const user = await User.findById(userId).select("-password");
        if (!user){ 
            return res.status(404).json({ message: "User not found!" })
        };
        return res.status(200).json(user);
    } catch (err) {
        console.error("user error", err);
        return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getselecteduser = async (req,res) =>{
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(!user){
            return res.status(404).json({message :"User Does Not Exist !"});
        }
        return res.status(200).json(user);
        
    } catch (error) {
        console.error("user Does not exist error",error);
        return res.status(500).json({message :"Internal Server Error"});
    }

}

const updateuser = async (req, res) => {
    try {

        console.log("→ Update route hit");
        const userId = req.user; // This comes from the auth middleware
        const user = await User.findById(userId);
        if (!user) {
            console.log("✘ User not found");
            return res.status(404).json({ message: "User not found!" })};

        const {
        username,
        email,
        oldpassword,
        newpassword,
        confirmpassword,
        } = req.body;
  
        if (username) user.username = username;
        if (email) user.email = email;

        if (req.file) {
            console.log("✔ File uploaded to:", req.file.path);
            userId.profilephoto = req.file.path; 
        }

        if(newpassword && confirmpassword) {
            if (!oldpassword || !newpassword || !confirmpassword) {
                return res.status(400).json({ message: "All password fields are required!" });
            }    
            const isMatch = await bcrypt.compare(oldpassword, user.password);
            if(!isMatch){ 
                return res.status(401).json({ message: "Old password is incorrect" })
            };
            if(newpassword !== confirmpassword) {
                return res.status(409).json({ message: "New passwords do not match!" })
            };
            if (newpassword.length < 8) {
                return res.status(400).json({ message: "Password must be 8+ characters" });
            };
            const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!strongPassword.test(newpassword)) {
                return res.status(400).json({
                message:
                    "Password must include uppercase, lowercase, number, and special character",
                });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newpassword, salt);
        }
        await user.save();
        return res.status(200).json({ message: "Profile updated successfully!" });

    } catch (err) {
        console.error("Update user error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    };
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.user; 
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

   
    if (user.profilephoto && !user.profilephoto.includes("user.jpg")) {
      const publicId = user.profilephoto
      .split("/").
      pop().
      split(".")[0];
      await cloudinary.uploader.destroy(`profile_photos/${publicId}`);
    }

    await user.deleteOne();

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/"
    });

    return res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
    getuser,
    getselecteduser,
    updateuser,
    deleteUser
}