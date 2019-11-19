
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

