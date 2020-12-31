const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Event = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ticketImage: {
        type: String,
        required: true
    },
    price: {
        type: Object,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    RSVP: {
        type: Object,
        required: true
    }
}, {timestamps: true});

const eventModel = mongoose.model('event', Event);

module.exports = eventModel;