import { Request, Response } from "express";
import { cloudinary } from "../config/cloudinary";
import User from "../models/User";

interface UserData {
  name: string;
  phone: string;
  email: string;
  img?: string;
}

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ errors: "User already exsist!" });
    }

    let data: UserData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    };

    if (req.file && req.file.originalname) {
      // default resource_type take as image, it can be video or other like raw
      const result = await cloudinary.uploader.upload(req?.file?.path, {
        resource_type: "image",
        folder: `Contact-Lists/${req.body.name}`,
      });
      data.img = result.secure_url;
    }

    const newUser = await User.create(data);

    res.status(201).json({
      newUser,
      message: `User created successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ errors: "User doesn't exsist" });
    }

    const data: UserData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    };

    if (req.file && req.file.originalname) {
      // default resource_type take as image, it can be video or other like raw
      const result = await cloudinary.uploader.upload(req?.file?.path, {
        resource_type: "image",
        folder: `Contact-Lists/${req.body.name}`,
      });
      data.img = result.secure_url;
    }
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json({ success: true, user, message: "Profile updated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error happened when updating user" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ errors: "User doesn't exsist" });
    }

    await user.remove();

    res.status(200).json({ success: true, message: "Profile deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error happened when deleting user" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export { createUser, updateUser, deleteUser, getUser, getUsers };
