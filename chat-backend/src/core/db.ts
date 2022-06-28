import mongoose from 'mongoose';
const config = require('config');

mongoose.connect(config.get('mongoUri'));