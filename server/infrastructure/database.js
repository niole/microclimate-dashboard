const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/test',
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
