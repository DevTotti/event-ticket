const mongoose = require('mongoose');
const cloudinary = require('../Services/cloudinary_service');
const fs = require('fs');
const Price = require('../Models/price');
const Event = require('../Models/event_model');


const createTicket = ((req, res) => {
    const path = req.file.path;
    if (!req.file){
        return res.json({
            error: true,
            message: 'File upload failed'
        });
    }
    if (!req.body.title || !req.body.description || !req.body.location || !req.body.price){
        fs.unlinkSync(path);
        return res.json({
            error: true,
            message: 'fill required fields'
        });
    }
    if (!path){
        return res.json({
            error: true,
            message: 'Error uploading file'
        });
    } else{
        console.log(`Uploading file ${path} to cloud`);
        cloudinary(path)
            .then((image) => {
                console.log(image.url);
                const imageUrl = image.url;
                const price = req.body.price;
                const title = req.body.title;
                const desc = req.body.description;
                const venue = req.body.location;
                const rsvp = req.body.rsvp;
                const eventId = new mongoose.Types.ObjectId;

                const newEvent = new Event({
                    _id: eventId,
                    title: title,
                    description: desc,
                    location: venue,
                    price: price,
                    ticketImage: imageUrl,
                    RSVP: rsvp
                })
                console.log(newEvent);
                newEvent.save()
                    .then((ticket) => {
                        console.log('Event data saved successfully!');
                        console.log('saving price information...');


                        const priceTag = JSON.parse(price);

                        console.log(priceTag);

                        const price_single = priceTag.single;
                        const price_couple = priceTag.couple;
                        const price_five = priceTag.five;
                        const price_ten = priceTag.ten;
                        
                        const newPrice = new Price({
                            eventId: eventId,
                            single: price_single,
                            couple: price_couple,
                            five: price_five,
                            ten: price_ten
                        })
                        console.log(newPrice);
                        newPrice.save()
                            .then((price) => {
                                res.json({
                                    error: false,
                                    message: 'Event and Ticket prices saved!'
                                });
                            })
                            .catch((err) => {
                                res.json({
                                    error: true,
                                    message: 'An error occured with prices',
                                    response: err
                                });
                            });
                    })
                    .catch((err) => {
                        res.json({
                            error: true,
                            message: 'An error occured with event',
                            response: err
                        });
                    });


            });
    }
});

const allTicket = ((req, res) => {

});

const oneTicket = ((req, res) => {

});

const deleteTicket = ((req, res) => {

});

const updateTicket = ((req, res) => {

});


module.exports = {
    createTicket,
    allTicket,
    oneTicket,
    deleteTicket,
    updateTicket
}