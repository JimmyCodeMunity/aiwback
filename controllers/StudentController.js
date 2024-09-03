const express = require('express');
const Student = require('../model/Student');
const nodemailer = require('nodemailer');


const fs = require('fs'); // Import the File System module

// Read the email template
const readFile = (path, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding}, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};
// Function to send notifications
async function Notify({ userEmail }) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'dev.jimin02@gmail.com', // Replace with actual credentials
            pass: 'uedwsojxwonxocwt' // Replace with actual credentials
        }
    });

    try {
        const htmlContent = await readFile('./welcome.html');

        const info = await transporter.sendMail({
            from: 'dev.jimin02@gmail.com',
            to: userEmail,
            subject: 'Welcome to AIWEN!',
            html: htmlContent
        });

        console.log("Email sent successfully!!", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
const createStudent = async(req,res)=>{
    try {
        const {fullname, email, phone,county,college,address,goal,hear,gender,city,linkedinurl,aoi,course} = req.body;
        const user = await Student.create({
            fullname,
            email,
            phone,
            county,
            address,
            goal,
            hear,
            college,
            gender,
            city,
            linkedinurl,
            aoi,
            course

        })
        res.status(201).json(user)
        Notify({ userEmail: email });
        console.log("User created successfully",user)
        
    } catch (error) {
        console.log('error creating user',error)
        res.status(500).json({message:'error creating user'})
        
    }
}


const getStudents = async(req,res)=>{
    try {
        const user = await Student.find({});
        res.status(200).json(user)
        console.log("Users fetched successfully",user)
        
    } catch (error) {
        console.log('error getting users',error)
        res.status(500).json({message:'error getting users'})
        
    }
}


const deleteStudent = async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedUser = await Student.findByIdAndDelete(id);
        res.status(200).json(deletedUser)
        console.log("User deleted successfully",deletedUser)
    } catch (error) {
        console.log('error deleting user',error)
        
    }
}
module.exports = {
    createStudent,
    getStudents,
    deleteStudent
}