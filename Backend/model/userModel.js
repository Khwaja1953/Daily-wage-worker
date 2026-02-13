const mongoose = require("mongoose");

// service area specifes where the worker is willing to work
const serviceAreaSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      trim: true,
    },

    area: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },

    pincode: {
      type: String,
      match: [/^\d{6}$/, "Please enter a valid pincode"],
    },


  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
   addresses: [
    {
      label: {
        type: String,
        enum: ["home", "work", "other"],
        default: "home",
      },
      address: String,
      city: String,
      pincode: String,
    },
  ],
  
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    profile: {
      type: String, // image URL
      default: "pfp.png",
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"],
    },

    password: {
      type: String,
      select: false,
    },

    role: {
      type: String,
      enum: ["customer", "worker", "admin"],
      default: "customer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

//? to verify OTP
verificationCode :String,
    

isBlocked: {
      type: Boolean,
      default: false,
    },

    serviceAreas: {
      type: [serviceAreaSchema],
      validate: {
        validator: function (val) {
          //val means: The value of the field being validated
          //Whatever value serviceAreas has, that becomes val => [ { area: "...", city: "..." } ]

//? "this" here refers to the entire documneted being validated
// val.length > 0 indicates that there exists atleast one obj in the array of serivceAreas
          return this.role !== "worker" || val.length > 0;
        },
        message: "Worker must have at least one service area",
      },
    },

    workerProfile: {
      services: {
        type: [String],
      },
      experience: {
        type: Number,
        min: 0,
      },

      availability: {
        type: Boolean,
        default: true,
      },

      // workingHours: {
      //   from: String,
      //   to: String,
      // },

      pricePerHour: {
        type: Number,
        min: 0,
      },
      pricePerDay: {
        type: Number,
        min:0
      },
// ratings/reviews given by other users
      ratings: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],


      kycStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);



userSchema.index({ role: 1 });
// above line helps mongoDB to filter out documents based on role much faster


module.exports = mongoose.model("User", userSchema);
