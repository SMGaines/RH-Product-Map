var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/images',express.static(__dirname + '/images'));
app.use('/audio',express.static(__dirname + '/audio'));

app.get('/',function(req,res)
{
    res.sendFile(__dirname+'/rhproducts.html');
});

server.listen(process.env.PORT || 8080,function()
{
    console.log('Listening on '+server.address().port);
});