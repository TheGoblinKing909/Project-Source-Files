const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '<DATABASE_PASSWORD>',
  database: '<DATABASE_NAME'
});

app.get('/data', function(req, res) {
  pool.query('SELECT * FROM login_info', function(error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/domains', (req, res) => {
    const { domainName } = req.body;
    const sql = 'INSERT INTO domains (domain_name) VALUES (?)';
    if (!domainName) {
        res.status(400).json({ message: "domainName is required" });
      } else {
        pool.query(sql, [domainName], (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error inserting domain into database');
            } else {
              console.log(`Inserted ${domainName} into database`);
              res.status(201).send('Domain inserted successfully');
            }
          });
      }
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});