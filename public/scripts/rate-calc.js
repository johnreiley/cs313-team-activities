function calcLetterStamped(weight) {
    if (weight <= 1) {
        return 0.55;
    } else if (weight <= 2) {
        return 0.70;
    } else if (weight <= 3) {
        return 0.85;
    } else if (weight <= 3.5) {
        return 1.00;
    } else {
        return 0;
    }
}

function calcLetterMetered(weight) {
    if (weight <= 1) {
        return 0.50;
    } else if (weight <= 2) {
        return 0.65;
    } else if (weight <= 3) {
        return 0.80;
    } else if (weight <= 3.5) {
        return 0.95;
    } else {
        return 0;
    }
}

function calcLargeEnvelope(weight) {
    let base = 1.00;
    let multiplier = 0.15;

    return ((Math.floor(weight) * multiplier) + base);
}

function calcPackage(weight) {
    if (weight <= 4) {
        return 3.66;
    } else if (weight <= 8) {
        return 4.39;
    } else if (weight <= 12) {
        return 5.19;
    } else if (weight <= 13) {
        return 5.71;
    } else {
        return 0;
    }
}

function getRates(req, res) {
    let weight = req.query.weight;
    let type = req.query.type;

    let price = 0;
    switch (type) {
        case "1":
            price = calcLetterStamped(weight);
            break;
        case "2":
            price = calcLetterMetered(weight);
            break;
        case "3":
            price = calcLargeEnvelope(weight);
            break;
        case "4":
            price = calcPackage(weight);
            break;
        default:
            return 1000;
    }

    
    console.log(price);
    json = `{ "price":${price} }`
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(json);
    res.end();
}


module.exports = {
    getRates: getRates
};