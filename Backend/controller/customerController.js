const User=require('../model/userModel')
const bcrypt=require('bcrypt')

const handleCustomerSignup=async(req,res)=>{
    try{
        const {name,profile,email,phone,password,addresses}=req.body
    if(!name || !phone || !password){
        return res.status(400).send({message:"name or phone or password is required"})
    }
    const existing=await User.findOne({name:name,phone:phone})
    if(existing){
        return res.status(400).send({message:"customer user already exists"})
    }
     const salt=bcrypt.genSaltSync(10)
        console.log(salt)
        const hashpassword=bcrypt.hashSync(password,salt) 
    const customer=await User.create({
        name,
        profile,
        phone,
        password:hashpassword,
        addresses,
        email,
        role:"customer"
    })
    return res.status(201).send({message:"customer user has been registered successfully"})
    }
    
    catch(error){
       return res.status(400).send({message:"error has occured in the customer SignUp"})
    }

  
}



module.exports={handleCustomerSignup}