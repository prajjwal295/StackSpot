import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import getDataUri from "../utils/dataUri.js";

// Update User
export const updateUser = async (req, res) => {
  try {
    const id = req.userId;
    const { password, username, firstname, lastname, email, bio } = req.body;
    const updateFields = {};

    // Check if the user exists
    const authUser = await User.findById(id);
    if (!authUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }


    if (username) updateFields.username = username;
    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (email) updateFields.email = email;
    if (bio) updateFields.bio = bio;

    const file = req.file;
    if (file) {
      const filUri = getDataUri(file);
      const result = await cloudinary.uploader.upload(filUri.content, {
        folder: "profile",
        resource_type: "auto",
        use_filename: true,
        public_id: file.originalname.split(".")[0],
      });

      updateFields.profilePhoto = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Update user in the database
    const user = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    // Send updated user data in the response
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete user

//get user
export const getUser = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// export const uploadProfilePhoto = async (req, res) => {
//   try {

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     const file = req.file;
//     const filUri = getDataUri(file);


//     const result = await cloudinary.uploader.upload(filUri.content, {
//       folder: "profile",
//       resource_type: "auto",
//       use_filename: true,
//       public_id: file.originalname.split(".")[0],
//     });


//     return res.json({
//       success: true,
//       public_id: result.public_id,
//       secure_url: result.secure_url,
//     });
//   } catch (err) {

//     console.error("Error uploading profile photo:", err);
//     return res.status(500).json({ success: false, message: "Failed to upload profile photo" });
//   }
// };


export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.userId } });

    if (allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      success: true,
      allUsers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getSearchedUser = async (req, res) => {
  const { search } = req.query;

  try {
    const searchedUser = await User.find({
      $or: [
        { firstname: { $regex: search, $options: "i" } },
        { lastname: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ],
    });

    if (!searchedUser || searchedUser.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json({
      success: true,
      searchedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};



