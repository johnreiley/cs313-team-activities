const express = require('express');
const path = require('path');
const {
  Pool
} = require('pg');
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL || "postgres://tzjtpcrsgscsnp:8d8ea39c7cca47ddadddf4ff15f51e8ce43bb5c4b785da0e99177a06d3056eae@ec2-54-221-214-3.compute-1.amazonaws.com:5432/dc6t92cvpmm3lh?ssl=true";
const pool = new Pool({
  connectionString: connectionString
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
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