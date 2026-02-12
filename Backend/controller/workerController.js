const User = require('../model/userModel')
const bcrypt = require('bcrypt')

const handleWorkerSignup = async (req, res) => {
  try {
    const { name,
      profile, email,
      phone,
      password,
      addresses, serviceAreas, workerProfile } = req.body;
    console.log(req.body)

    if (!name || !phone || !password) {
      return res.status(400).send({ message: "name or password or phone is required" })
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
      return res.status(400).send({ message: "user already exists" })
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
    return res.status(201).send({ message: "worker registered successfully" })
  }

  catch (error) {
    console.log(error)
    return res.status(500).json({ message: `error has occured in the worker SignUp ${error}` })
  }



}


module.exports = { handleWorkerSignup }