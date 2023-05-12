var mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongodbUrl = process.env.MONGODB_URL;
console.log(mongodbUrl);

mongoose.connect(mongodbUrl, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;