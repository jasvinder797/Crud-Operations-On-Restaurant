var express = require("express");
var path = require("path");

var app = express();


app.use(express.static(path.join(__dirname,"public")));

app.listen(8081,function(){


	 console.log("Server is runnint on port 8081");
})