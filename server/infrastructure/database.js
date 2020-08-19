const mongoose = require('mongoose');

const { DB_HOST = 'localhost' } = process.env;

mongoose.connect(
  `mongodb://${DB_HOST}:27017/climate`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

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
