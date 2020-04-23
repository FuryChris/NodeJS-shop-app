const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://chris-user:2qRTt9gxE2LFBInE@node-course-cuiqt.mongodb.net/shop?retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      }
    )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
const path = require('path');

module.exports = path.dirname(process.mainModule.filename);