// const userModel=require('../models/userModel.js');
// const bcrypt=require('bcryptjs');
// const jwt=require('jsonwebtoken');

// const registerController=async(req,res)=>{
//     try{
//         const existingUser=await userModel.findOne({email:req.body.email});
//         if(existingUser){
//             return res.status(200).send({
//                 success:false,
//                 message:"user already registered successfully"
//             })
//         }
//         // hashing password
//         const genSalt=await bcrypt.genSalt(10);
//         const hashPassword=await bcrypt.hash(req.body.password,genSalt);
//         req.body.password=hashPassword;
//         const user=new userModel(req.body);
//         await user.save();
//         return res.status(200).send({
//             success:true,
//             message:"user registered successfully"
//         });
//     }
//     catch(error){
//         return res.status(500).send({
//             success:false,
//             message:"error while registering user",
//             error,
//         });
//     }
// }

// REGISTER CONTROLLER
const userModel=require("../models/userModel");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findone({email:req.body.email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"user already registered successfully"
            })
        }
        const genSalt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,genSalt);
        req.body.password=hashedPassword;
        const user=new userModel(req.body);
        await user.save();
        return res.status(200).send({
            success:true,
            message:"user registered successfully"  
        })

    
    
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"error while registering user ",
            error
        });
    }

}

// login controller
const loginController=async(req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(404).send{
                success:false,
                message:"user not found"
            }
        }
        // check role
        if(user.role!==req.body.role){
            return res.status(500).send({
                success:false,
                message:"you are not authorized to access this resource"
            })
        }
        // compare password 
        const comparedpassword=await bcrypt.compare(req.body.password,hashedPassword)
        if(!comparedpassword){
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            })
        }
        const  token=jwt.sign({userid:user._id},process.env.JWT_SECRET);
        return res.status(200).send({
            success:true,
            message:"Login Successfully",
            token
        })

    }catch(error){
        return res.status(500).send({
            success:false,
            message:"error in login api",
            error
        })
    }
}