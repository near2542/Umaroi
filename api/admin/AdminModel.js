const db = require('mongoose')

const admin = {
    id : {type: String,required:true,unique:true},
    password : {type: String, required:true},
    name: {type:String,default:"Fuck"}
  }
  const adminDB = db.model('admins',admin)

  module.exports = adminDB;

