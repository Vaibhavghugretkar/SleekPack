const mongoose= require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:mongoose");


mongoose.connect(`${config.get("MONGODB_URI")}/sleepack`)
.then(function(){
    dbgr("connected");
}).catch(function(err){
   dbgr("error");
})

module.exports =mongoose.connection;