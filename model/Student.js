const express = require('express');
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email:{
        type: String
    },
    address:{
        type:String
    },
    country:{
        type:String
    },
    goal:{
        type:String
    },
    course:{
        type:String
    },
    hear:{
        type:String
    },
    phone:{
        type:String
    },
    gender:{
        type:String
    },
    city:{
        type:String
    },
    linkedinurl:{
        type:String
    },
    aoi:{
        type:String
    },
    college:{
        type:String
    },
    
}) 



const Student = mongoose.model('Student',StudentSchema);

module.exports = Student;