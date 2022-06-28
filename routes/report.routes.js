const { Router } = require('express');
const Report = require('../models/Report');

const router = Router();
const auth = require('../middleware/auth.middleware');


router.post('/createreport', auth, async (req, res) => {
    try {

        const { cause, reportType, ad, account } = req.body;

        if (reportType === 'user') {
            const report = new Report({
                cause, reportType, account: account._id, sender: req.account.accountId
            });
            await report.save(function (err) {
                console.log(err);
            });
            res.status(201).json({ message: 'Report created' });

        }
        if (reportType === 'ad') {
            const report = new Report({
                cause, reportType, ad: ad._id, sender: req.account.accountId
            });
            await report.save(function (err) {
                console.log(err);
            });
            res.status(201).json({ message: 'Report created' });
        }
    } catch (e) {

        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});



module.exports = router;