const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/random-countries'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/random-countries/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000, ()=>{
  console.log('Server Started');
})