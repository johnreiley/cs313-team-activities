const express = require('express');
const session = require('express-session');
const path = require('path');
const {
  Pool
} = require('pg');
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL || "postgres://tzjtpcrsgscsnp:8d8ea39c7cca47ddadddf4ff15f51e8ce43bb5c4b785da0e99177a06d3056eae@ec2-54-221-214-3.compute-1.amazonaws.com:5432/dc6t92cvpmm3lh?ssl=true";
const pool = new Pool({
  connectionString: connectionString
});
// const bcrypt = require("bcrypt");

express()
  .use(session({secret: "free_money!", resave: true, saveUninitialized: true}))
  .use(express.static(path.join(__dirname, 'public')))
  .use(logRequest)
  .use(verifyLogin)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getServerTime', (req, res) => {
    var success = true;
    var time = new Date();
  })
  .post('/login', (req, res) => {
    if (req.params.username && req.params.password) {
      const username = req.params.username;
      const password = req.params.password;
      console.log(`Username: ${username} -- Password: ${password}`);

      if (username === "admin" && password === "password") {
        res.status(200);
        res.send({
          success: true
        });
        if (typeof req.session.username === "undefined") {
          req.session.username = username;
        }
      } else {
        res.status(401);
        res.send({
          success: false
        });
      }
    } else {
      res.status(401);
      res.send({
        success: false
      })
    }
  })
  .post('/logout', (req, res) => {
    if (req.session.username) {
      req.session.destroy();
      res.status(200);
      res.send({success: true});
    } else {
      res.status(401);
      res.send({success: false});
    }
  })
  //////////////////////////////////////////////////////////////////////////////////////
  .get('/math', (req, res) => {
    let operand1 = parseInt(req.query.num1);
    let operand2 = parseInt(req.query.num2);
    let operator = req.query.oper;
    let result = math(operand1, operand2, operator);

    res.render('pages/math', {
      result: result.toString()
    });
    res.end();
  })
  .get("/getPerson", (req, res) => {
    res.header("Content-Type", "application/json");

    let id = req.query.id;
    console.log(id);
    let sql = "SELECT (first_name, last_name, birth_date) FROM person WHERE id=$1";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(result.rows);
    });
  })
  .get('/math_service', (req, res) => {
    let operand1 = parseInt(req.query.num1);
    let operand2 = parseInt(req.query.num2);
    let operator = req.query.oper;
    let result = math(operand1, operand2, operator);

    let json = `{"result": ${result}}`;

    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.write(json);
    res.end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function math(operand1, operand2, operator) {
  let result = 0;

  switch (operator) {
    case "add":
      result = operand1 + operand2;
      break;
    case "subtract":
      result = operand1 - operand2;
      break;
    case "multiply":
      result = operand1 * operand2;
      break;
    case "divide":
      result = operand1 / operand2;
      break;
    default:
      result = 'You messed up!';
  }

  return result;
}

function logRequest(req, res, next) {
  console.log("Received a request for: " + req.url);
  next();
}


function verifyLogin(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.status(401);
    res.send({message: "Yo foo! Login first!"})
  }
}

// function hashPasswords(plainText) {
//   bcrypt.hash(plainText, 10, (err, hash) => {
//     if (err) {
//       return false; // Something went wrong
//     } else {
//       return hash;  // Return hashed password
//     }
//   });
// }

// function comparePasswords(hashed, plainText) {
//   bcrypt.compare(plainText, hashed, (err, res) => {
//     if (err || !res) {
//       return false; // Passwords do not match
//     } else {
//       return true;  // Passwords match
//     }
//   });
// }