const express = require('express');
const { Subscribe, getSubscribers, Unsubscribe } = require('../controllers/MailSubscription');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

//subscribe
router.post('/subscribetomail',Subscribe);
//get all subscribers
router.get('/subscribers', getSubscribers);

//unsubscribe
router.delete('/unsubscribe/:id',Unsubscribe);

module.exports = router;