const express = require('express');
const router = express.Router();
const checkAuth = require('../Middleware/check-auth');
const multer = require('multer');
const ticketController = require('../Controllers/ticket_controller');





//
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log(req.body);
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null,  file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(new Error('invalid file type'), false)
    }
     
}
const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.post('/create', upload.single('ticketImage'), checkAuth, ticketController.createTicket);



module.exports = router;