import bcript from "bcryptjs";
import userModel from "../../Db/models/user.model.js";
import { tokenFunc } from "../../Utils/token.js";
// import asyncHandler from 'express-async-handler'

export const signUp =async(req, res) => {
  // try {
    const { name, email, password, cpass, age } = req.body;
    const hashedpass = bcript.hashSync(password, +process.env.SALT_ROUNDS);
    const newUser = new userModel({ name, email, password: hashedpass, age });
    const savedUser = await newUser.save();
    if (savedUser) {
      res.status(201).json({ message: "user saved successfuly", savedUser });
    } else {
      res.json({ message: "user saved failed" });
    }
  // } catch (error) {
  //   console.log(error);
  //   if (error.code == 11000) {
  //     return res.json({ message: "email is already exist" });
  //   }
  //   res.json({ message: "catch error" });
  // }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      if (!user.login) {
        const logUser = await userModel.updateOne({ email }, { login: true });
        const passMatch = bcript.compareSync(password, user.password);
        if (passMatch) {
          const token = tokenFunc({
            payload: { _id: user._id, email: user.email, name: user.name },
          });
          res.json({ message: "login success", token });
        } else {
          res.json({ message: "Invalid password" });
        }
      } else {
        res.json({ message: "you already logged in" });
      }
    } else {
      res.json({ message: "user email not found please sign up" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await userModel.findByIdAndDelete({ _id });
    if (user) {
      res.json({ message: "User Deleted successfuly", user });
    } else {
      res.json({ message: "User Deleted failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const { email, name, age, password } = req.body;
    const hashedpass = bcript.hashSync(password, +process.env.SALT_ROUNDS);
    const user = await userModel.findByIdAndUpdate(
      { _id },
      { email, name, age, password: hashedpass },
      { new: true }
    );
    if (user) {
      res.json({ message: "User updated successfuly", user });
    } else {
      res.json({ message: "User updated failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const logOut = async (req, res) => {
  try {
    const { login, email } = req.user;
    if (login) {
      const logUser = await userModel.updateOne({ email }, { login: false });
      res.json({ message: "user logout succfully" });
    } else {
      res.json({ message: "please login first" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};



export const uploadProfile = async(req,res,next)=>{
  if(!req.file){
    next(Error("please select file",{cause:400}))
  }
  const {_id} = req.user;
  const user = await userModel.findByIdAndUpdate(_id,{
    profile:req.file.path})
    if(!user){
      next(Error("please login first",{cause:400}))
    }
    res.status(200).json({message:"Done"})
}


export const coverPicts = async(req,res,next)=>{
if(!req.files.length){
  next(Error("please select files",{cause:400}))
}
const {_id} = req.user
let coverArray =[]; 
for (const file of req.files) {
  coverArray.push(file.path)
}

const users = await userModel.findByIdAndUpdate(_id,{
  cover_pic:coverArray
})
if(!users){
  next(Error("please login first",{cause:400}))
}
res.status(200).json({message:"Done"})
}