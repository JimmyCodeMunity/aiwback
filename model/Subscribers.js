const mongoose = require('mongoose');
const SubscriberSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        
    },
    subscription_date: {
        type: Date,
        default: Date.now
    }
})


const Subscriber = mongoose.model('Mailsubscription',SubscriberSchema);

module.exports = Subscriber;