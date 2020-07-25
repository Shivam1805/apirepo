

const express = require('express');
const app = express()
const cors = require('cors');


const bodyParser = require('body-parser');

const mySql = require('mysql');

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


var sqlDb = mySql.createConnection({
  host: 'serverlessproject.cjxgcvbhqtfz.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'serverless',
  port: '3306', database: 'serverless'
});

sqlDb.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('MySql Connected');
});


app.get('/', (_req418, res418) => {
  try {
    res418.send('Job Application started');
  }
  catch (error) {
    return res418.status(404).send('error occurred during initial setup');
  }
});




app.post('/userLogin', (req, res, next) => {
  try {
    email = req.body.email
    password= req.body.password
    if (email) {
      let auth = "select * from usercredentials where email=? and password=?"
      values = [email, password]
      sqlDb.query(auth, values, (err, results) => {
        if (err) {
          res.status(404).send('err')
        }
        if (Object.keys(results).length > 0) {
          return res.status(200).send('User Verified')
        }
        
      })
    }
  }
  catch (e) {
    next(e);
  }
});


port = process.env.Port || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.get('*', (_req, res) => {
  res.send('Invalid url, please enter valid url path');
});

