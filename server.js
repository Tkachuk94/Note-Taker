//Required NPM
const express = require('express');

//expressing app & port
const app = express();
const PORT = process.env.PORT || 3001;


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//required Routes
require('./routes/routes')(app);
require('./routes/htmlroutes')(app);

//Listen on which port
app.listen(PORT, function() {
  console.log(`Server is listening on PORT: ${PORT}`);
});