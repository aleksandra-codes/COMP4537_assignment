const http = require('http');
const mysql = require('mysql');
const port = process.env.PORT || 8080;
const url = require('url');
const express = require('express');
var app = express();
// configure the app to use bodyParser()
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const db = mysql.createConnection({
    host: 'localhost',
    user: 'aleksand_users',
    password: 'comp4537123',
    database: 'aleksand_db_quiz'
    });
        
db.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});


app.get('/quotes_app/' , (req, res) =>
{
    db.query("SELECT quoteid, quote, author FROM quote", (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
} 
);


app.post('/quotes_app', (req, res) => { 
    console.log('post request sent')
    parsed_body = JSON.parse(JSON.stringify(req.body))
    body = JSON.parse(Object.keys(Object.assign({}, parsed_body))[0]);
    insertData("'" + body.quote+ "'",  "'"+ body.author +  "'", db);
    console.log(JSON.stringify(parsed_body))
    console.log(body)
    res.send("POST Request Called") 
}) 

app.delete('/quotes_app/:id', (req, res) => { 
    console.log('delete request sent')
    const { id } = req.params;
    console.log(req.params)
    console.log(id)
    
     let sql = `DELETE FROM quote WHERE quoteid = ?`;
        db.query(sql, id, (error, results, fields) => {
          console.log('inside delete')    
          if (error)
            return console.error(error.message);
        
          console.log('Deleted Row(s):', results.affectedRows);
            req.on('end', () => {
                console.log("end of delete request ");
            });
        });
    res.send("DELETE request completed")
}) 

app.put('/quotes_app', (req, res) => { 
    console.log('put request sent')
    parsed_body = JSON.parse(JSON.stringify(req.body))
    body = JSON.parse(Object.keys(Object.assign({}, parsed_body))[0]);
    updateData(body.quoteid, "'" + body.quote+ "'",  "'"+ body.author +  "'", db);
    console.log(JSON.stringify(parsed_body))
    console.log(body)
    
    res.send("PUT Request Called") 
})


app.listen(port, () => console.log(`Listening on port ${port}.. hahah`));


function insertData(quote, author, db) {
  db.query('INSERT INTO quote (quote, author) VALUES (' + quote + ',' + author + ')', 
  function(err,result) {
        if(err) throw err
    });
}


function updateData(quoteid, quote, author, db) {
  db.query('UPDATE quote SET quote = ' + quote + ', author = ' + author + ' WHERE quoteid = ' + quoteid, 
  function(err,result) {
        if(err) throw err
    });
}
