//Required 
const fs = require('fs');

//Exports
module.exports = function(app) {

//Gets previously used info From the db.json
  app.get('/api/notes', function(req, res) {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbInfo = JSON.parse(data);
      res.send(dbInfo);
    });
  });

//Adds the note to the DB.json
  app.post('/api/notes', function(req, res) {
    const userNotes = req.body;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbInfo = JSON.parse(data);
      dbInfo.push(userNotes);
//Changes the ID number of each note
      let idNumber = 1;
      dbInfo.forEach((note, index) => {
        note.id = idNumber;
        idNumber++;
        return dbInfo;
      });
      console.log(dbInfo);

      stringData = JSON.stringify(dbInfo);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send('Thank you for your note!');
  });

  //Deletes the note.
  app.delete('/api/notes/:id', function(req, res) {
    const removeNote = req.params.id;
    console.log(removeNote);

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;

      dbInfo = JSON.parse(data);
      for (let i = 0; i < dbInfo.length; i++) {
        if (dbInfo[i].id === Number(removeNote)) {
          dbInfo.splice([i], 1);
        }
      }
      console.log(dbInfo);
      stringData = JSON.stringify(dbInfo);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.status(204).send();
  });
};