<<<<<<< HEAD
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

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

    res.render('pages/math', { result: result.toString() });
    res.end();
})
.get('/math_service', (req, res) => {
    let operand1 = parseInt(req.query.num1);
    let operand2 = parseInt(req.query.num2);
    let operator = req.query.oper;
    let result = math(operand1, operand2, operator);

    let json = `{"result": ${result}}`;

    res.writeHead(200, {"Content-Type": "application/json"});
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
=======
const app = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const gameEngine = require('./public/scripts/gameEngine.js');
const rateCalc = require('./public/scripts/rate-calc.js');
const {
  Pool
} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app()
  .use(app.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.sendFile('w09-assign.html', {
    root: __dirname + "/public"
  }))
  .get('/game', gameEngine.playGame)
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = {
        'results': (result) ? result.rows : null
      };
      res.render('pages/db', results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/getRates', rateCalc.getRates)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
>>>>>>> 407575f56b6ba19f65b661bd63097b1499b77fcc
