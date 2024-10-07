const express = require('express');
const nodemailer = require('nodemailer');
const Subscriber = require('../model/Subscribers');

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
        const htmlContent = await readFile('../email-template.html');

        const info = await transporter.sendMail({
            from: 'dev.jimin02@gmail.com',
            to: userEmail,
            subject: 'Welcome to Our Newsletter!',
            html: htmlContent
        });

        console.log("Email sent successfully!!", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Function to handle subscription requests
async function Subscribe(req, res) {
  try {
    // Validate input
    if (!req.body.email || !req.body.email.trim()) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const { email } = req.body;
    const subscriber = await Subscriber.create({ email });
    
    Notify({ userEmail: email });

    res.status(201).json({ message: "Subscribed successfully", subscriber: subscriber });
  } catch (error) {
    console.error("Subscription failed:", error);
    res.status(500).json({ message: "Failed to add subscriber" });
  }
}

// Function to get subscribers
async function getSubscribers(req, res) {
  try {
    const subscribers = await Subscriber.find({});
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ message: "Failed to get subscribers" });
  }
}

// Function to handle unsubscribe requests
async function Unsubscribe(req, res) {
  try {
    const { id } = req.params;
    const unsubscribe = await Subscriber.findByIdAndDelete(id);
    if (!unsubscribe) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    console.log("User unsubscribed:", unsubscribe);
    res.status(200).json(unsubscribe);
  } catch (error) {
    console.error("Error while unsubscribing:", error);
    res.status(500).json({ message: "Failed to unsubscribe subscriber" });
  }
}

module.exports = { Subscribe, getSubscribers, Unsubscribe };
