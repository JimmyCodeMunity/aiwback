const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  county: {
    type: String,
  },
  goal: {
    type: String,
  },
  
  hear: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  linkedinurl: {
    type: String,
  },
  aoi: {
    type: String,
  },
  experiencelevel: {
    type: String,
  },
  companyname: {
    type: String,
  },
  fieldofwork: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
