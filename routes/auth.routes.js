const { Router } = require('express');
const Account = require('../models/Account');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = Router();
const config = require('config');
const { countDocuments } = require('../models/Account');
const { reduce } = require("lodash");


// /api/auth/register
router.post(
    '/register',
    [
        check('phone', 'Incorrect phone').isMobilePhone(),
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min length 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration'
                })
            }

            const { firstName, lastName, email, phone, password } = req.body;

            const candidate = await Account.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: "This user already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const account = new Account({ firstName, lastName, email, phone, password: hashedPassword, fullname: (lastName + " " + firstName) });

            await account.save();

            res.status(201).json({ message: 'Account created' });


        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    });

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect data').isEmail().normalizeEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during login'
                })
            }

            const { email, password } = req.body;

            const account = await Account.findOne({ email });

            if (!account) {
                return res.status(400).json({ message: 'Account is not found' });
            }

            const isMatch = await bcrypt.compare(password, account.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            // const token = jwt.sign(
            //     { accountId: account.id },
            //     config.get('jwtSecret')//,
            //     //{ expiresIn: '10s' }
            // );

            const token = jwt.sign(
                {
                    accountId: account.id,
                    data: reduce(account, (result, value, key) => {
                        if (key !== "password") {
                            result[key] = value;
                        }
                        return result;
                    }, {})
                },
                config.get('jwtSecret') || "",
                {
                    // expiresIn: config.get('jwtSecret'),
                    algorithm: "HS256",
                }
            );


            res.json({ token, accountId: account.id, userType: account.userType });

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    });


module.exports = router;

