const { Router } = require('express');
const router = Router();
const Account = require('../models/Account');
const Ad = require('../models/Ad');
const auth = require('../middleware/auth.middleware');

router.get('/getmyfavourites', auth, async (req, res) => {
    try {
        const user = await Account.findById(req.account.accountId);
        const myFavouritesId = user.favourites;
        const myFavourites = [];
        if (myFavouritesId) {
            for (const favourite of myFavouritesId) {
                const ad = await Ad.findById(favourite);
                if (ad) {
                    myFavourites.push(ad);
                }
            }
        }
        res.json(myFavourites);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});


router.post('/addfavourite', auth, async (req, res) => {
    try {

        const { adId } = req.body;

        const user = await Account.findById(req.account.accountId);

        const includes = user.favourites.includes(adId);

        if (includes) {
            return res.status(400).json({ message: "This ad is already a favorite" });
        }

        user.favourites.push(adId);

        await user.save();

        res.status(201).json({ message: 'Favourite added' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.post('/favouritesremove/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const account = await Account.findById(req.account.accountId);
        account.favourites.pull({ _id: req.params.id });
        await account.save();
        res.json({ message: 'Ad removed' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});


module.exports = router;