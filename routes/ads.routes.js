const { Router } = require('express');
const Ad = require('../models/Ad');

const router = Router();
const auth = require('../middleware/auth.middleware');

router.get('/getads', async (req, res) => {
    try {
        const ads = await Ad.find();
        res.json(ads);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/getmyads', auth, async (req, res) => {
    try {
        const ads = await Ad.find({ account: req.account.accountId });
        res.json(ads);
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const ads = await Ad.findById(req.params.id);
        res.json(ads);
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.post('/createad', auth, async (req, res) => {
    try {
        const { type, gender, color, information, age, breed, price, animalName, picture, location } = req.body;
        const ad = new Ad({
            type, gender, color, information, age, breed, price, animalName, isTop: false,
            account: req.account.accountId, picture, location
        });



        await ad.save(function (err) {
            console.log(err);
        });



        res.status(201).json({ message: 'Ad created' });

    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/getads/:id', async (req, res) => {
    try {
        const ads = await Ad.find({ account: req.params.id });

        res.json(ads);
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});


router.delete('/adremove/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;

        await Ad.deleteOne({ _id: id });
        res.json({ message: 'Favourites removed' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.post('/updatemyad',
    auth, async (req, res) => {
        try {


            const { id, type, gender, color, information, age, breed, price, animalName, picture, location } = req.body;

            /*console.log(`id: ${id}\ntype: ${type}\ngender: ${gender}\ncolor: ${color}\ninformation: ${information}\nage: ${age}\nbreed: ${breed}\nprice: ${price}\nanimalName: ${animalName}\npicture: ${picture}\nlocation: ${location}`);
*/
            await Ad.findByIdAndUpdate(id, {
                $set: {
                    type: type, gender: gender, color: color, information: information,
                    age: age, breed: breed, price: price, animalName: animalName, picture: picture, location: location
                }
            })
            res.status(201).json({ message: 'Ad updated' });

        } catch (e) {

            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    });


router.get('/similar/:breed', async (req, res) => {
    try {
        const ads = await Ad.find({ breed: req.params.breed });
        res.json(ads);
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});


module.exports = router;