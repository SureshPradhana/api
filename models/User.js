const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name:{
        type: String,
      required: true,
      min: 3,
      max: 20,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    gender:{
        type:String,
        required:true,
        max:15,
    },
    mobile:{
        type:String,
        required:true,
        max:14,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    profilePublic:{
        type:Boolean,
        default:true,

    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);