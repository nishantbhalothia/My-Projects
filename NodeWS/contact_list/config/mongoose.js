const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('successfully connected to database');
})
