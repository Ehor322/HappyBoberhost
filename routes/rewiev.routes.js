const { Router } = require('express');
const Report = require('../models/Report');
const Account = require('../models/Account');
const router = Router();
const auth = require('../middleware/auth.middleware');
const Rewiev = require('../models/Rewiev');


router.post('/createrewiev', auth, async (req, res) => {
    try {

        const { text, rating, receiver, sender } = req.body;

        const rewiev = new Rewiev({
            text, rating, receiver, sender
        });
        await rewiev.save(function (err) {
            console.log(err);
        });
        //res.json(rewiev);
        res.status(201).json({ message: 'Rewiev created' });


    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});


router.get('/getrewievs/:id', async (req, res) => {
    try {

        const receiver = req.params.id;

        const rewievs = await Rewiev.find({ receiver: receiver }).populate('sender').exec();
        res.json(rewievs);
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});


module.exports = router;