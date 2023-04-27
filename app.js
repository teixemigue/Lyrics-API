const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();

const port = process.env.PORT||3001;



//Middlewares

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
  



//Open database connection

const db = new sqlite3.Database('data.db');


//ROUTES



app.get('/lyrics/:songName', (req, res) => {
    const { songName } = req.params;
    const query = 'SELECT lyric FROM song WHERE title = ?';
  
    db.get(query, [songName], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else if (!row) {
        res.status(404).send('Song not listed in the database!');
      } else {
        res.send(row.lyric);
      }
    });

});
  
  
//start listening

app.listen(port, () => {
    console.log('API listening on port '+ port);
  });
