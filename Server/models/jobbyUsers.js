const mongoose=require("mongoose");

const jobbyUsersDataSchema = new mongoose.Schema({

  name:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true,
  },
  phoneNumber:{
    type:String,
    require:true,
  },
  gender:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    require:true
  }
  
})

const jobbyUsers = mongoose.model('jobbyUsers',jobbyUsersDataSchema);

module.exports = jobbyUsers;