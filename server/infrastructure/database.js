const mongoose = require('mongoose');

const { DB_HOST = 'localhost' } = process.env;

const URI = `mongodb://${DB_HOST}:27017/climate`;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

module.exports = new Promise((resolve, reject) => {

  db.on('error', error => {
    reject(error);
  });

  db.once('open', function() {
    // we're connected!
    resolve(db);
  });
}).catch(error => {
  console.error('connection error:', error);
});
