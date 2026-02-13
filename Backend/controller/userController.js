const User=require('../model/userModel')
const bcrypt=require('bcrypt')
//to handle signup for customer (employer)
const handleCustomerSignup=async(req,res)=>{
    try{
        const {name,profile,email,phone,password,addresses}=req.body
    if(!name || !phone || !password){
        return res.status(400).json({message:"name or phone or password is required"})
    }
    const existing=await User.findOne({name:name,phone:phone})
    if(existing){
        return res.status(400).json({message:"customer user already exists"})
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
    return res.status(201).json({message:"customer user has been registered successfully"})
    }
    
    catch(error){
       return res.status(400).json({message:"error has occured in the customer SignUp"})
    }

  
}

// to handle signup for worker
const handleWorkerSignup = async (req, res) => {
  try {
    const { name,
      profile, email,
      phone,
      password,
      addresses, serviceAreas, workerProfile } = req.body;
    console.log(req.body)

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "name or password or phone is required" })
    }


    if (!serviceAreas || serviceAreas.length === 0) {
      return res.status(400).json({
        message: "Worker must have at least one service area"
      });
    }

    if (!workerProfile || !workerProfile.services ) {
      return res.status(400).json({
        message: "Worker must provide at least one service"
      });
    }

    const existingUser = await User.findOne({ phone: phone })
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" })
    }
    const salt = bcrypt.genSaltSync(10)
    console.log(salt)
    const hashpassword = bcrypt.hashSync(password, salt)
    const worker = await User.create({
      name,
      password: hashpassword,
      phone,
      email,
      profile,
      role: "worker",
      serviceAreas: serviceAreas,
      workerProfile: {
        services: workerProfile.services,
        experience: workerProfile.experience,
        pricePerHour: workerProfile.pricePerHour,
        pricePerDay: workerProfile.pricePerDay,

      }

    })
    return res.status(201).json({ message: "worker registered successfully" })
  }

  catch (error) {
    console.log(error)
    return res.status(500).json({ message: `error has occured in the worker SignUp ${error}` })
  }



}


// verification of email to be used by both customer and woker




//login logic same for both ends
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Compare password (await is CRITICAL)
    const isPasswordMatch = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4. Check email verification
    if (!foundUser.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

    // 5. Successful login
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: foundUser._id,
        email: foundUser.email,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports={handleCustomerSignup , handleWorkerSignup, handleLogin}