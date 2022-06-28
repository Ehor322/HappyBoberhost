const { Router } = require('express');
const Dialogs = require('../models/Dialog');
const Message = require('../models/Message');
const router = Router();
const auth = require('../middleware/auth.middleware');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

router.get('/dialogs', auth, async (req, res) => {
    try {
        const userId = req.account.accountId;
        
        Dialogs.find().or([{ author: userId }, { partner: userId }]).populate(["author", "partner", "ad"]).populate({ path: "lastMessage", populate: { path: "user" }}).exec(function (err, dialogs) {
            if (err) {
                console.log(err)
                return res.status(404).json({ message: 'Dialogs not found' });
            }
            return res.json(dialogs);
        });
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

module.exports = router;