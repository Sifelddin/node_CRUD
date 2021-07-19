const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    dateN: {
        type: String,
        required: true
    },

    subscribeDate: {
        type: Date,
        required: true,
        default:new Date
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)