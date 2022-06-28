const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json({ extended: true }));


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/ads', require('./routes/ads.routes'));
app.use('/api/favourites', require('./routes/favourites.routes'));
app.use('/api/account', require('./routes/account.routes'));
app.use('/api/report', require('./routes/report.routes'));
app.use('/api/rewiev', require('./routes/rewiev.routes'));
app.use('/api/dialogs', require('./routes/dialogs.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();