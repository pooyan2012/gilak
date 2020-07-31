const mongoose = require("mongoose");
const crypto = require("crypto");//this is deprecated must use other way = TO-DO
//UUIDs are just 128 bit pieces of data, that is displayed as (128/4) = 32 hexadecimal digits
//const uuidv1 = require("uuidv1");
const { uuid } = require("uuidv4"); //this is more randome and secure

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//Virtual Fields|https://mongoosejs.com/docs/tutorials/virtuals.html
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    //this.salt = uuidv1();
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (e) {
      console.log(e);
    }
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
};

/*
A model is a class with which we construct documents. 
In this case, each document will be a user with properties and behaviors as declared in our schema. 
*/
module.exports = mongoose.model("User", userSchema);
