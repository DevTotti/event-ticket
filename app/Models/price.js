const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Price = new Schema({
    eventId: {
        type: String,
        required: true
    },
    single: {
        type: Number,
        required: true
    },
    couple: {
        type: Number,
        required: true
    },
    five: {
        type: Number,
        required: true
    },
    ten: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const priceModel = mongoose.model('price', Price);

module.exports = priceModel