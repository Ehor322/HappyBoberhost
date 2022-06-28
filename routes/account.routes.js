const { Router } = require('express');
const Account = require('../models/Account');
const router = Router();
const auth = require('../middleware/auth.middleware');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

router.get('/getaccount', auth, async (req, res) => {
    try {

        const account = await Account.findById(req.account.accountId);
        res.json(account);
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        res.json(account);
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.post('/updatemyacc',
    auth, async (req, res) => {
        try {


            const { id, firstName, lastName, email, phone, password, region, description, website, photo } = req.body;

            const hashedPassword = await bcrypt.hash(password, 12);
            /*console.log(`id: ${id}\nfirstName: ${firstName}\nlastName: ${lastName}\nemail: ${email}\nphone: ${phone}\npassword: ${password}\nregion: ${region}\ndescription: ${description}\nwebsite: ${website}\nphoto: ${photo}\nhashedPassword: ${hashedPassword}`);*/

            const candidate = await Account.findOne({ email });

            if (candidate && candidate.email !== email) {
                return res.status(400).json({ message: "This user already exists" });
            }





            await Account.findByIdAndUpdate(id, {
                $set: {
                    firstName: firstName, lastName: lastName, email: email, phone: phone,
                    password: hashedPassword, region: region, description: description, website: website, photo: photo, fullname: (lastName + " " + firstName)
                }
            })
            res.status(201).json({ message: 'Account updated' });

        } catch (e) {

            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    });

router.post('/subscription',
    auth, async (req, res) => {
        try {


            const { id, term } = req.body;

            Account.findOne({ _id: id }, function (err, foundObject) {
                if (err) {
                    //console.log(err);
                    res.status(500).send();
                }
                else {
                    foundObject.isSubscriber = true;
                    foundObject.expirySubscription = ((new Date()).setDate((new Date()).getDate() + term));
                }
                foundObject.save(function (err, updatedObject) {
                    if (err) {
                        //console.log(err);
                        res.status(500).send();
                    }
                    else {
                        res.status(201).json({ message: 'Account updated' });
                    }
                })
            })


        } catch (e) {

            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    });





module.exports = router;